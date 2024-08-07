import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { ModalContentComponent } from 'src/app/components/modal-component/modal.component';
import { CallService } from 'src/app/service/CallService';
import { ChatService } from 'src/app/service/ChatService';
import { MessageService } from 'src/app/service/MessageService';
import { SocketService } from 'src/app/service/SocketService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private routerSubscription: Subscription = new Subscription();
  private chatsSubscription: Subscription = new Subscription();
  private socketSubscription: Subscription = new Subscription();

  constructor(
    private modalController: ModalController,
    private callService: CallService,
    private chatService: ChatService,
    private socketService: SocketService,
    private messageService: MessageService,
    private router: Router
  ) {}

  chats: Map<string, any> = new Map<string, any>();
  chatsArray: [string, any][] = [];

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async () => {
        if (this.router.url === '/tabs/home') {
          await this.loadData();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.chatsSubscription.unsubscribe();
    this.socketSubscription.unsubscribe();
  }

  async loadData() {
    try {
      this.chatsSubscription.unsubscribe();
      this.socketSubscription.unsubscribe();

      this.chatsSubscription = this.chatService.chats$.subscribe((chats) => {
        this.chats = chats;
        this.chatsArray = Array.from(this.chats);
      });

      const result = await this.callService.call({
        method: 'get',
        isToken: true,
        body: {},
        endPoint: 'allChats'
      });

      if (result['message'].code == 1 || result['message'].code == 2) {
        return;
      }

      const data = result['data'];
      const chats = (data ?? []).map((chat: any, index: any) => ({
        id: chat.id || `chatId${index}`,
        users: (chat.users ?? []).map((user: any) => user._id.username || ''),
        name: chat.name,
        messages: [
          (chat.messages ?? []).map((message: any, index: any) => ({
            _id: `nuevoID${index}`,
            user: {
              id: message['sender'].id,
              name: message['sender'].username
            },
            multimedia: message['multimedia'],
            description: message['description'],
            createdAt: message['createdAt'] ?? new Date(Date.now()).toISOString()
          }))
        ]
      }));

      const chatsMap = new Map<string, any>(
        chats.map((chat: any) => [chat.id, chat])
      );

      this.chatService.setChats(chatsMap);

      this.socketSubscription = this.socketService.onMessage('receiveMessage').subscribe((data: any) => {
        const chatId = data['idChat'][0];
        const user = {
          id: data['sender'].id[0] as string,
          name: data['sender'].username as string
        };

        this.chatService.addMessageToChat(chatId, {
          _id: data['idMessage'] as string,
          user,
          description: data['description'] || '' as string,
          multimedia: data['multimedia'] as { type: string, url: string },
          createdAt: data['createdAt']
        });

        this.messageService.addMessage({
          _id: data['idMessage'] as string,
          user,
          description: data['description'] || '' as string,
          multimedia: data['multimedia'] as { type: string, url: string },
          createdAt: data['createdAt']
        });
      });

    } catch (error) {
      return;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalContentComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }
}
