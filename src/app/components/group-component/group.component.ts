import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from '../input-component/input.component';
import { ContactComponent } from '../contact-component/contact.component';

@Component({
  selector: 'app-screen2',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss'],
  imports: [IonicModule, CommonModule, InputComponent, ContactComponent],
  standalone: true
})
export class GroupScreenComponent implements OnInit {
  @Output() navigate = new EventEmitter<number>();

  regexGroupName: string = '.{5,}';
  groupName: string = '';
  isValidGroupName: boolean = false;
  searchTxt:string = '';
  selectedContacts: string[] = [];
  contacts = [
      { id: '1', name: 'Uldren Gedde' },
      { id: '2', name: 'Gabriela Gedde' },
      { id: '3', name: 'Erika Tourt' }
  ];
  filteredContacts = [...this.contacts];

  
  //TODO: Aqui cargar todos los amigos del usuario
  ngOnInit(): void {
    console.log('Aqui hara la solicitud para cargar contactos');  
  }


  onValueChangeGroupName(newValue: string) {
    this.groupName = newValue;
    this.isValidGroupName = new RegExp(this.regexGroupName).test(newValue);
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTxt = value;
    this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(this.searchTxt)
    );
  }

  onContactSelected(contactId: string) {
    const index = this.selectedContacts.indexOf(contactId);
    if (index >= 0) {
        this.selectedContacts.splice(index, 1);
    } else {
        this.selectedContacts.push(contactId);
    }
  }

  //TODO: Aqui se creara el grupo con los contactos iniciales que sean seleccionados
  onClick(){
    if(!this.isValidGroupName) return;

    console.log(this.selectedContacts);

  }


  previousScreen() {
    this.navigate.emit(1);
  }
}
