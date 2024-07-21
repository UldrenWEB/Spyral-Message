import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-message-item',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class MessageItemComponent{
    
}