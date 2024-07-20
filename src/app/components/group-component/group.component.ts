import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-screen2',
  templateUrl: 'group.component.html',
  imports: [IonicModule],
  standalone: true
})
export class GroupScreenComponent {
  @Output() navigate = new EventEmitter<number>();

  previousScreen() {
    this.navigate.emit(1);
  }
}
