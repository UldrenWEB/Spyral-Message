import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ChatService } from "src/app/service/ChatService";
import { MessageService } from "src/app/service/MessageService";
import { SocketService } from "src/app/service/SocketService";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class ChatComponent {
  constructor(
    private router: Router,
    private chatService: ChatService,
    private socketService: SocketService,
    private messageService: MessageService
  ) {}

  @Input() id: string = '';
  @Input() name: string | null = null;
  @Input() users: Array<string> = [];
  @Input() isGroup: boolean = false;
  @Input() notViews: number = 0;
  @Input() messages: Array<{_id: string, user:{id: string, name: string}, multimedia:{url: string, type: string} | null, description: string, createdAt: string}> = [];

  redirectToChat = () => {
    this.socketService.joinChat(this.id);
    this.messageService.setChatId(this.id);
    this.router.navigate(['/chat-page'], { queryParams: { chatId: this.id } });
  }

  getFormattedUsers = (users: Array<string> = [], maxLength: number = 10): string => {
    if (users.length > 1) {
      const allButLast = users.slice(0, -1).join(', ');
      const last = users[users.length - 1];
      let formattedUsers = `${allButLast} & ${last}`;
      if (formattedUsers.length > maxLength) {
        return `${formattedUsers.substring(0, maxLength)}...`;
      }
      return formattedUsers;
    } else {
      return users[0] || '';
    }
  }
}
