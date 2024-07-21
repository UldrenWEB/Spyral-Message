import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class SearchComponent {
    @Output() navigate = new EventEmitter<number>();
}