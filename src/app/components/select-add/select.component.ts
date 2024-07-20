import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-screen1',
  styleUrls: ['select.component.scss'],
  templateUrl: 'select.component.html',
  imports: [IonicModule],
  standalone: true
})
export class SelectAddScreenComponent {
  @Output() navigate = new EventEmitter<number>();

  nextScreen() {
    this.navigate.emit(2);
  }
}
