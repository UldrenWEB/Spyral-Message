import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CarouselComponent } from "../carousel-component/carousel.component";
import { CAROUSEL_DATA_ITEMS } from "./carousel.const";
import { StateService } from "src/app/service/StateService";

@Component({
    selector: 'app-state',
    templateUrl: 'state.component.html',
    styleUrls: ['state.component.scss'],
    imports: [
      IonicModule,
      CommonModule,
      CarouselComponent
    ],
    standalone: true,
  })
export class StateComponent implements OnInit  {
    @Input() imageUser: string = 'https://unavatar.io/geddeu';
    items: any[] = [];
    
    constructor(
        private router: Router,
        private stateService: StateService
    ){}

    ngOnInit(): void {
        this.items = CAROUSEL_DATA_ITEMS;
    }

}