import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../card-component/card.component';
import { ContactComponent } from '../contact-component/contact.component';

@Component({
  selector: 'app-screen1',
  styleUrls: ['select.component.scss'],
  templateUrl: 'select.component.html',
  imports: [IonicModule, CardComponent, ContactComponent],
  standalone: true
})
export class SelectAddScreenComponent implements OnInit {

  @Output() navigate = new EventEmitter<number>();
  searchTxt: String = '';
  private allContact: Array<Object> = [];
  filteredContact: Array<Object>  = [];


  ngOnInit(): void {
    console.log('Cargo el select add');
  }


  nextScreen(to: number) {
    this.navigate.emit(to);
  }

  
  //TODO: Se debe aqui traer todos sus contactos y poder filtrar la busqueda con eso
  //Entonces en el onChange se filtraran siempre esos contactos
  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTxt = value;
  }
}
