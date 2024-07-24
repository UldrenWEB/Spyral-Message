import { CommonModule } from "@angular/common";
import { Component, Input, OnInit} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CarouselComponent } from "../carousel-component/carousel.component";
import { ICarouselItem } from "../carousel-component/icarousel-item.metadata";
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
export class StateComponent {
    @Input() imageUser: string = 'https://unavatar.io/geddeu';
    @Input() nameUser: string = 'Uldren Gedde'
    @Input() userId: string = 'alsdkjfalkdj';
    @Input() items: ICarouselItem[] = [];
    
    constructor(
      private stateService: StateService,
    ){}


    openModal(){
      this.stateService.setItems(this.items);
      const modal = document.querySelector('ion-modal');
      modal?.present();
    }

}