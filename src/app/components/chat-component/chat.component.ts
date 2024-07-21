import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MessageService } from "src/app/service/MessageService";

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls:['chat.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class ChatComponent{

    constructor(
        private router: Router,
        private messageService: MessageService,
    ){}

    @Input() id: string = '';
    @Input() name: string | null = null;
    @Input() users: Array<string> = [
        'Uldren Gedde',
        'Gabi Gedde',
        'Erika Tourt',
        'Sol Iliana',
        'Iliana Gedde',
        'Uldren Papa'
    ];
    @Input() isGroup: boolean = false;
    @Input() notViews: number = 0;
    @Input() messages: Array<any> = [
        { _id: 'fasdlasdk', user: { id: 'idLKADFLA', name: 'Uldren Gedde' }, multimedia: { url: 'https://unavatar.io/erikatourt', type: 'image' }, description: 'Este es un nuevo mensaje', createdAt: new Date().toISOString() },
        { _id: 'fasdlasdk', user: { id: '12348923e', name: 'Gabriela Gedde' }, multimedia: { url: 'https://adlk', type: 'audio' }, description: 'Hola', createdAt: new Date(Date.now() - 60000).toISOString() }, // Hace 1 minuto
        { _id: 'fasdlasdk', user: { id: 'dfaklsdje', name: 'Erika Tourt' }, multimedia: { url: 'https://adlk', type: 'audio' }, description: 'Como estas', createdAt: new Date(Date.now() - 120000).toISOString() }, // Hace 2 minutos
        { _id: 'fasdlasdk', user: { id: 'fadkjj23', name: 'Enmanuel Colina' }, multimedia: { url: 'https://adlk', type: 'audio' }, description: 'Ya no te veo desde hace rato', createdAt: new Date(Date.now() - 180000).toISOString() }, // Hace 3 minutos
        { _id: 'fasdlasdk', user: { id: '2348239', name: 'Iliana Gedde' }, multimedia: { url: 'https://adlk', type: 'audio' }, description: 'Como te sientes', createdAt: new Date(Date.now() - 240000).toISOString() }, // Hace 4 minutos
        { _id: 'fasdlasdk', user: { id: '28349287394823', name: 'Iliana Gedde' }, multimedia: { url: 'https://adlk', type: 'audio' }, description: 'Como te sientes', createdAt: new Date(Date.now() - 240000).toISOString() } // Hace 4 minutos
    ];

    redirectToChat = () => {
        this.messageService.setMessage(this.messages);
        this.messageService.setName(this.name);
        this.router.navigate(['/chat-page'])
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