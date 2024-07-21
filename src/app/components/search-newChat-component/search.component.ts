import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ContactComponent } from "../contact-component/contact.component";

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule, ContactComponent],
    standalone: true
})
export class SearchComponent implements OnInit {
    @Output() navigate = new EventEmitter<number>();
    searchTxt:string = '';
    contacts = [
        { id: '1', name: 'Uldren Gedde' },
        { id: '2', name: 'Gabriela Gedde' },
        { id: '3', name: 'Erika Tourt' }
    ];
    filteredContacts = [...this.contacts];

    
    //TODO: Aqui cargar todos sus amigos
    ngOnInit(): void {
        console.log('Aqui hara la solicitud para cargar contactos');
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