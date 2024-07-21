import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "src/app/service/MessageService";
import { StorageService } from "src/app/service/StorageService";

@Component({
    selector: 'app-chat-page',
    templateUrl: 'chat.page.html',
    styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
    
    messages: Array<any> = [];
    user: any = {};
    nameMessage: string | null = null;

    constructor(
        private messageService: MessageService,
        private storageService: StorageService,
        private router: Router
    ){}

    async ngOnInit(): Promise<void> {
        this.messages = this.messageService.getMessages();
        this.nameMessage = this.messageService.getName();
        const result = await this.storageService.get('user');
        const {user} = JSON.parse(result);
        this.user = user;
    }

    backPage = () => {
        this.router.navigate(['/tabs/home'])
    }


    //! Aqui se enviaria en formdata ese mensaje y al socket
    handleSendMessage(event: { message: string, image: Blob | null }) {
        const {newMessage} = this.createMessage(event.message, event.image);
        this.messages = [...this.messages, newMessage];
    }

    createMessage(message: string, image: Blob | null) {
        const user = this.user;
        let newMessage: any = {
            _id: 'IdDelMensaje',
            user: {
                id: user.id,
                name: user.username,
            },
            description: message,
            createdAt: new Date().toISOString()
        };
        if (image) {
            const url = URL.createObjectURL(image);
            newMessage.multimedia = {
                type: 'image',
                url: url
            };
        }
    
        return {newMessage};
    }


}