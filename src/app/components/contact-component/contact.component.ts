import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.scss'],
    imports: [IonicModule, CommonModule],
    standalone: true
})
export class ContactComponent {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() isCheckbox: boolean = false;
    @Input() selectedIds: string[] = [];
    @Output() contactSelected = new EventEmitter<string>();

    get selected(): boolean {
        return this.selectedIds.includes(this.id);
    }

    constructor(
        private router: Router
    ){}

    onClick = () => {
        if (this.isCheckbox) {
            this.contactSelected.emit(this.id);
        } else {
            // Lógica para redirigir o crear chat
            // Aquí debe redirigir a crear un nuevo chat
            // Si tiene ya un chat lo redirige hasta ahí
            // Si no tiene un chat lo crea y lo lleva hasta ahí
        }
    }
}
