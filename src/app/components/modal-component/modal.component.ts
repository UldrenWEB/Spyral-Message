import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { SelectAddScreenComponent} from '../select-add/select.component';
import { GroupScreenComponent } from '../group-component/group.component';
import { SearchComponent } from '../search-newChat-component/search.component';
import { SearchFriendComponent } from '../search-addFriend-component/search.component';

@Component({
  selector: 'app-modal-content',
  template: `
    <ng-template #container></ng-template>
  `,
  styleUrls: ['modal.component.scss']
})
export class ModalContentComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  private currentComponentRef!: ComponentRef<any>;

  constructor() {}

  ngOnInit() {
    this.loadScreen(SelectAddScreenComponent, 'slide-in-left');
  }

  loadScreen(component: Type<any>, animation: string) {
    if (this.currentComponentRef) {
      const prevComponentRef = this.currentComponentRef;
      const prevElement = prevComponentRef.location.nativeElement;
      prevElement.classList.add(animation === 'slide-in-left' ? 'slide-out-right' : 'slide-out-left');

      setTimeout(() => {
        prevComponentRef.destroy();
      }, 600);
    }

    this.container.clear();
    this.currentComponentRef = this.container.createComponent(component);
    const currentElement = this.currentComponentRef.location.nativeElement;
    currentElement.classList.add('screen-container', animation);
    this.currentComponentRef.instance.navigate.subscribe((nextScreen: number) => {
      if (nextScreen === 1) {
        this.loadScreen(SelectAddScreenComponent, 'slide-in-right');
      } else if (nextScreen === 2) {
        this.loadScreen(GroupScreenComponent, 'slide-in-left');
      } else if(nextScreen === 3){
        this.loadScreen(SearchComponent, 'slide-in-left');
      } else if (nextScreen === 4){
        this.loadScreen(SearchFriendComponent, 'slide-in-left');
      }
    });
  }
}
