import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ContactComponent } from "../contact-component/contact.component";
import { CallService } from "src/app/service/CallService";

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule, ContactComponent],
    standalone: true
})
export class SearchComponent implements OnInit {

    constructor(
        private callService: CallService,
        private cdr: ChangeDetectorRef
    ){}

    @Output() navigate = new EventEmitter<number>();
    searchTxt:string = '';
    contacts: Array<{id: string, name: string, image: string}> = [];
    filteredContacts: Array<{id: string, name: string, image: string}> = [];

    
    async ngOnInit(): Promise<void> {
        const result = await this.callService.call({
          method: 'get',
          endPoint: 'allFriends',
          body: {},
          isToken: true
        })
        if(result['message'].code == 1 || result['message'].code == 3){
          return;
        }
        const data = result['data'];
    
        const contacts = (data ?? []).map((friend: any) => {
          return {
            id: friend.id,
            name: friend.username,
            image: friend['profile'].profile_picture
          }
        });
    
        this.contacts = contacts;
        this.filteredContacts = [...this.contacts];
        this.cdr.detectChanges();
      }

    onChange(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        this.searchTxt = value;
        this.filteredContacts = this.contacts.filter(contact =>
            contact.name.toLowerCase().startsWith(this.searchTxt)
        );
    }

    previusView = () => {
        this.navigate.emit(1);
    }

}