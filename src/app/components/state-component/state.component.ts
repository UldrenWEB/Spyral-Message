import { CommonModule } from "@angular/common";
import { Component, Input, OnInit} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CarouselComponent } from "../carousel-component/carousel.component";
import { ICarouselItem } from "../carousel-component/icarousel-item.metadata";
import { StateService } from "src/app/service/StateService";
import { StorageService } from "src/app/service/StorageService";

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
export class StateComponent implements OnInit {
    @Input() imageUser: string = 'https://unavatar.io/geddeu';
    @Input() nameUser: string = 'Uldren Gedde'
    @Input() userId: string = 'alsdkjfalkdj';
    @Input() items: ICarouselItem[] = [];
    
    idUser: string = '';

    constructor(
      private stateService: StateService,
      private storageService: StorageService
    ){}

    isCurrentUser = () => {
      return this.userId === this.idUser;
    }

    async ngOnInit(): Promise<void> {
      try{
        const response = await this.storageService.get('user');
        const {user} = JSON.parse(response);
        console.log(`id de la prop -> ${this.userId} : id del usuario actuaL ${this.idUser}`)
        this.idUser = user.id;
      }catch(error){
        return;
      }
    }


    openModal(){
      this.stateService.setItems(this.items);
      const modal = document.querySelector('ion-modal');
      modal?.present();
    }

}