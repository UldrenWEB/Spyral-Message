import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../card-component/card.component';
import { ContactComponent } from '../contact-component/contact.component';
import { CommonModule } from '@angular/common';
import { CallService } from 'src/app/service/CallService';

@Component({
  selector: 'app-screen1',
  styleUrls: ['select.component.scss'],
  templateUrl: 'select.component.html',
  imports: [IonicModule, CardComponent, ContactComponent, CommonModule],
  standalone: true
})
export class SelectAddScreenComponent implements OnInit {

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
