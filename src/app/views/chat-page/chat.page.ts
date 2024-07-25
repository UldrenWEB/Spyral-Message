import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/ChatService';
import { StorageService } from 'src/app/service/StorageService';
import { MessageService } from 'src/app/service/MessageService';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/service/SocketService';

@Component({
  selector: 'app-chat-page',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {

    @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef | undefined;

  messages: Array<any> = [];
  user: any = {};
  nameMessage: string | null = null;
  chatId: string | null = null;
  private chatSubscription: Subscription | null = null;
  private messageSubscription: Subscription | null = null;
  private idSubscription: Subscription | null = null;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService
  ) {}

  async ngOnInit(): Promise<void> {
    this.messageSubscription = this.messageService.chatId$.subscribe((id) => {
        console.log(`Este es el nuevo id de chat -> ${id}`);
        this.chatId = id;
    })

    if (this.chatId) {
      this.chatSubscription = this.chatService.chats$.subscribe((chats) => {
        const chat = chats.get(this.chatId!);
        if (chat) {
            this.messageService.setMessages(chat.messages[0]);
            this.nameMessage = chat.name;
            this.cdr.detectChanges(); 
            this.scrollToBottom();
        }
      });

      this.messageSubscription = this.messageService.messages$.subscribe((messages) => {
        this.messages = messages;
        this.cdr.detectChanges(); 
        this.scrollToBottom();
      });
    }

    const result = await this.storageService.get('user');
    const { user } = JSON.parse(result);
    this.user = user;
  }

  private scrollToBottom() {
    if (this.messageContainer) {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  backPage = () => {
    this.router.navigate(['/tabs/home']);
  }

  handleSendMessage(event: { message: string, image: Blob | null, audio: Blob | null }) {
    const { newMessage } = this.createMessage(event.message, event.image, event.audio);
    if (this.chatId) {
      console.log('Entro aqui')
      // this.chatService.addMessageToChat(this.chatId, newMessage);
      // this.messageService.addMessage(newMessage);
      this.socketService.sendMessage({...newMessage, chatId: this.chatId, userId: this.user.id});
    }
  }

  createMessage(message: string, image: Blob | null, audio: Blob | null) {
    const user = this.user;
    let newMessage: any = {
      _id: 'IdDelMensaje',
      user: {
        id: user.id,
        name: user.username,
      },
      description: message.length <= 0 ? '': message,
      createdAt: new Date().toISOString(),
      chatId: this.chatId
    };
    if (image) {
      const url = URL.createObjectURL(image);
      newMessage.multimedia = {
        type: 'image',
        url: url,
        file: image      
      };
    }

    if (audio) {
      const url = URL.createObjectURL(audio);
      newMessage.multimedia = {
        type: 'audio',
        url: url,
        file:audio
      };
    }

    return { newMessage };
  }
}
