import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector:'app-card',
    templateUrl: "card.component.html",
    styleUrls: ['card.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class CardComponent {
    @Input() description: String = '';
    @Input() icon: 'group' | 'chat' | 'friend' = 'chat';

    objIcon: any = {
        group: 'people-outline',
        chat: 'chatbubble-ellipses-outline',
        friend: 'person-add-outline'
    }
    
}