import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ContactComponent } from "../contact-component/contact.component";
import { CallService } from "src/app/service/CallService";
import { MessageBarComponent } from "../message-bar/message-bar.component";

@Component({
    selector: 'app-friend',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule, ContactComponent, MessageBarComponent],
    standalone: true
})
export class SearchFriendComponent implements OnInit {
    @Output() navigate = new EventEmitter<number>();
    selectedContacts: string[] = [];
    searchTxt:string = '';
    contacts : Array<{id: string, name: string, image:string}> = []
    filteredContacts: Array<{id: string, name: string, image:string}> = [];

    showAlert: boolean = false;
    alertMessage: string = '';
    alertCode: number = 0;
    private isShow: Boolean = false;

    constructor(
        private callService: CallService,
        private cdr: ChangeDetectorRef
    ){}


    async ngOnInit(): Promise<void> {
        try{
            const result = await this.callService.call({
                method: 'get',
                body: {},
                isToken: true,
                endPoint: 'allUsers'
            })
            if(result['message'].code == 1 || result['message'].code == 3){
                return;
            }
            const data = result['data'];
            const contacts = (data ?? []).map((user: any) => {
                return {
                    id: user.id,
                    name: user.username,
                    image: user['profile'].profile_picture
                }
            });

            console.log(contacts)
            this.contacts = contacts;
            this.filteredContacts = [...this.contacts];
            this.cdr.detectChanges();
        }catch(error){
            return;
        }
    }

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


    onContactSelected(contactId: string) {
        const index = this.selectedContacts.indexOf(contactId);
        if (index >= 0) {
            this.selectedContacts.splice(index, 1);
        } else {
            this.selectedContacts.push(contactId);
        }
    }

    onChange(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        this.searchTxt = value;
        this.filteredContacts = this.contacts.filter(contact =>
            contact.name.toLowerCase().startsWith(this.searchTxt)
        );
    }

    //! Aqui debera enviar la solicitud de amistad a todos esos usuario seleccionados
    getSelectedContacts = async () => {
        console.log(this.selectedContacts)
        if(this.selectedContacts.length <= 0)  
            return this.#showMessageBar('You must select at least one user', 3);
        try{
            const result = await this.callService.call({
                endPoint: 'sendRequests',
                isToken: true,
                body: {
                    friendIds: this.selectedContacts
                },
                method: 'post'
            })
            console.log(result);

            this.#showMessageBar(result['message'].description, result['message'].code);
            if(result['message'].code == 1 || result['message'].code == 3){
                return;
            };

            setTimeout(() => {
                this.previusView();
            }, 500)
        }catch(error){
            return this.#showMessageBar('There was an error sending friend requests',1)
        }
    }

    previusView = () => {
        this.navigate.emit(1);
    }
}