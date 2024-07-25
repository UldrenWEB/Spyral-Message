import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CallService } from "src/app/service/CallService";
import { MessageBarComponent } from "../message-bar/message-bar.component";
import { ChatService } from "src/app/service/ChatService";

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.scss'],
    imports: [IonicModule, CommonModule, MessageBarComponent],
    standalone: true
})
export class ContactComponent {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() isCheckbox: boolean = false;
    @Input() selectedIds: string[] = [];
    @Input() image: string = '';
    @Output() contactSelected = new EventEmitter<string>();

    showAlert: boolean = false;
    alertMessage: string = '';
    alertCode: number = 0;
    private isShow: Boolean = false;

    get selected(): boolean {
        return this.selectedIds.includes(this.id);
    }

    constructor(
        private router: Router,
        private callService: CallService,
        private chatService: ChatService
    ){}

    #showMessageBar = (message: string, code : 0 | 1 | 3 = 0) => {
        if(this.isShow) return;
        
        this.isShow = true;
        this.alertCode = code;
        this.alertMessage = message;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.isShow = false;
        }, 3000)
      }

    onClick = async () => {
        if (this.isCheckbox) {
            this.contactSelected.emit(this.id);
        } else {
            try{
                const resultExistChat = await this.callService.call({
                    method: 'get',
                    body: {},
                    isToken: true,
                    endPoint: `existsChat`,
                    id: this.id
                })
                
                const exist = resultExistChat['exists'];

                if(exist)
                    return this.#showMessageBar('You already have an existing chat with this person', 3);


                const result = await this.callService.call({
                    method: 'post',
                    isToken: true,
                    body: {
                        idUser: [this.id],
                        status: false
                    },
                    endPoint: 'createChat'
                })
                console.log(result);
                if(!result['chatId']){
                    return this.#showMessageBar('Could not create new chat', 1);
                }

                this.chatService.addChat({
                    id: result['chatId'],
                    users: result['users'],
                    name: '',
                    messages: []
                })

                this.#showMessageBar('The chat was successfully created', 0);
            }catch(error){
                return this.#showMessageBar('There was an error creating the new chat', 1)
            }
        }
    }
}
