import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-request-friend',
    templateUrl: 'request.page.html',
    styleUrls: ['request.page.scss']
})
export class RequestPage implements OnInit {
    @Output() navigate = new EventEmitter<number>();
    selectedContacts: string[] = [];
    searchTxt:string = '';
    contacts = [
        { id: '1', name: 'Uldren Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '3', name: 'Erika Tourt' }
    ];
    filteredContacts = [...this.contacts];

    //TODO: Aqui cargar todas las solicitudes de amistad
    ngOnInit(): void {
        console.log('Aqui hara la solicitud para cargar contactos');
    }

     //! Aqui se aceptaran todas las solicitudes
     onClick() {
        console.log(this.selectedContacts);
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