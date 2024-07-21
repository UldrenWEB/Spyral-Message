import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
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
    @Input() name: String = '';
    @Input() id: String = '';


    constructor(
        private router: Router
    ){}

    onClick = () => {
        //Aqui debe redirigir a crear un nuevo chat
        //Si tiene ya un chat lo redirije hasta ahi
        //Si no tiene un chat lo crea y lo lleva hasta ahi
    }

}

