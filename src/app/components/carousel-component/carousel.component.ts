import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ICarouselItem } from "./icarousel-item.metadata";

@Component({
    selector: 'app-carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.scss'],
    imports: [CommonModule, IonicModule],
    standalone: true
})
export class CarouselComponent implements OnInit {
    @Input() height = 500;
    @Input() isFullScreen = false;
    @Input() items: ICarouselItem[] = [];


    public finalHeight: string | number = 0;
    public currentPosition = 0;

    constructor(

    ){
        this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
    }

    ngOnInit(): void {
        this.items.map((i,index) => {
            i.id = index,
            i.marginLeft = 0;
        })
    }

    setCurrentPosition(position: number){
        this.currentPosition = position;
        const foundItem = this.items.find(i => i.id === 0);
        if (foundItem) {
          foundItem.marginLeft = -100 * position;
        }
    }

    setNext(){
        let finalPercentage = 0;
        let nextPosition = this.currentPosition + 1;
        if(nextPosition <=  this.items.length -1){
            finalPercentage = -100 * nextPosition;
        }else{
            nextPosition = 0;
        }

        const foundItem = this.items.find(i => i.id === 0);
        if (foundItem) {
          foundItem.marginLeft = finalPercentage;
          this.currentPosition = nextPosition;
        }
    }

    setBack(){
        let finalPercentage = 0;
        let backPosition = this.currentPosition -1;
        if(backPosition >= 0){
            finalPercentage = -100 * backPosition;
        }else{
            backPosition = this.items.length - 1;
            finalPercentage = -100 * backPosition;
        }

        const foundItem = this.items.find(i => i.id === 0);
        if (foundItem) {
          foundItem.marginLeft = finalPercentage;
          this.currentPosition = backPosition;
        }
    }
}