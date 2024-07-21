import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-friend',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class SearchFriendComponent {
    @Output() navigate = new EventEmitter<number>();
}