import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/app/service/MessageService";
import { StorageService } from "src/app/service/StorageService";

@Component({
    selector: 'app-chat-page',
    templateUrl: 'chat.page.html',
    styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
    
    messages: Array<any> = [];
    user: Object = {};

    constructor(
        private messageService: MessageService,
        private storageService: StorageService
    ){}

    async ngOnInit(): Promise<void> {
        this.messages = this.messageService.getMessages();
        this.user = await this.storageService.get('user');
    }


    handleSendMessage(event: { message: string, image: Blob | null }) {
        console.log('Mensaje:', event.message);
        if (event.image) {
            console.log('Imagen Blob:', event.image);
        } else {
            console.log('Imagen:', null);
        }
        // Aquí puedes manejar el mensaje y la imagen según sea necesario
    }


}