import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../card-component/card.component';
import { ContactComponent } from '../contact-component/contact.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screen1',
  styleUrls: ['select.component.scss'],
  templateUrl: 'select.component.html',
  imports: [IonicModule, CardComponent, ContactComponent, CommonModule],
  standalone: true
})
export class SelectAddScreenComponent implements OnInit {

  @Output() navigate = new EventEmitter<number>();
  searchTxt:string = '';
  contacts = [
      { id: '1', name: 'Uldren Gedde' },
      { id: '2', name: 'Gabriela Gedde' },
      { id: '3', name: 'Unai Simmons' },
      { id: '4', name: 'Erick Hernandez' },
      { id: '5', name: 'Erika Tourt' }
  ];
  filteredContacts = [...this.contacts];


  //Aqui se cargaran solo los amigos del usuario
  ngOnInit(): void {
    console.log('Cargo el select add');
  }


  nextScreen(to: number) {
    this.navigate.emit(to);
  }

  
  //TODO: Se debe aqui traer todos sus contactos y poder filtrar la busqueda con eso
  //Entonces en el onChange se filtraran siempre esos contactos
  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTxt = value;
    this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(this.searchTxt)
    );
}
}
