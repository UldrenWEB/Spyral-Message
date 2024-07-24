import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICarouselItem } from "../components/carousel-component/icarousel-item.metadata";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private itemsSubject = new BehaviorSubject<ICarouselItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  setItems(items: ICarouselItem[]) {
    this.itemsSubject.next(items);
  }

  getItems() {
    return this.itemsSubject.value;
  }
}
