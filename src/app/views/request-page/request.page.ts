import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { CallService } from "src/app/service/CallService";
import { StorageService } from "src/app/service/StorageService";

@Component({
    selector: 'app-request-friend',
    templateUrl: 'request.page.html',
    styleUrls: ['request.page.scss']
})
export class RequestPage implements OnInit {
    @Output() navigate = new EventEmitter<number>();
    selectedContacts: string[] = [];
    searchTxt:string = '';
    contacts: Array<{id: string, name: string}> = [];
    filteredContacts = [...this.contacts];
      //Prop alert
    showAlert: boolean = false;
    alertMessage: string = '';
    alertCode: number = 0;
    private isShow: Boolean = false;
    private routerSubscription: any;

    constructor(
        private callService: CallService,
        private router: Router
    ){}

    async ngOnInit(): Promise<void> {
        await this.load();
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(async () => {
          if (this.router.url === '/tabs/request') {
            await this.load();
          }
        });
      }

    load = async () => {
        try{
            const result = await this.callService.call({
                method: 'get',
                endPoint: 'allRequest',
                body: {},
                isToken: true
            })
            this.#showMessageBar(result['message'].description, result['message'].code);
            if(result['message'].code == 1 || result['message'].code == 3){
                return;
            }
            const data = result['data'];
            const requests = (data ?? []).map((request: any) => ({
                id: request['sender'].id,
                name: request['sender'].username
            }))
            this.contacts = requests;
            this.filteredContacts = this.contacts;

        }catch(error){
            return this.#showMessageBar('An error occurred while loading requests', 1);
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

     //! Aqui se aceptaran todas las solicitudes
     async onClick() {
        try{
            console.log(this.selectedContacts)
            const result = await this.callService.call({
                method:'post',
                endPoint: 'acceptRequests',
                body:{userIds:this.selectedContacts},
                isToken: true
            })
            this.#showMessageBar(result['message'].description, result['message'].code);
            if(result['message'].code == 1 || result['message'].code == 3){
                return;
            }
            setTimeout(() => {
                this.router.navigate(['/tabs/home']);
            }, 500)

        }catch(error){
            return this.#showMessageBar('An error occurred while accepting a friend request.', 1)
        }

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

   
}