import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ContactComponent } from "../contact-component/contact.component";

@Component({
    selector: 'app-friend',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule, ContactComponent],
    standalone: true
})
export class SearchFriendComponent implements OnInit {
    @Output() navigate = new EventEmitter<number>();
    selectedContacts: string[] = [];
    searchTxt:string = '';
    contacts = [
        { id: '1', name: 'Uldren Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '3', name: 'Erika Tourt' }
    ];
    filteredContacts = [...this.contacts];


    //TODO: Aqui cargar todos los usuarios de la aplicacion
    ngOnInit(): void {
        console.log('Aqui hara la solicitud para cargar contactos');
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
    getSelectedContacts() {
        console.log(this.selectedContacts);
    }

    previusView = () => {
        this.navigate.emit(1);
    }
}