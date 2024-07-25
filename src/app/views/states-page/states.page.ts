import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { ICarouselItem } from 'src/app/components/carousel-component/icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from 'src/app/components/state-component/carousel.const';
import { CAROUSEL_DATA_ITEMS as bebe } from 'src/app/components/state-component/carousel2.const';
import { CallService } from 'src/app/service/CallService';
import { StateService } from 'src/app/service/StateService';

@Component({
  selector: 'app-states',
  templateUrl: 'states.page.html',
  styleUrls: ['states.page.scss']
})
export class StatesPage implements OnInit {
  items: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  items2: ICarouselItem[] = bebe;
  states: Array<{name: string, image: string, items: Array<ICarouselItem>, id:string}> = [];
  items$: Observable<ICarouselItem[]> = new Observable<ICarouselItem[]>();
  

  showAlert: boolean = false;
  alertMessage: string = '';
  alertCode: number = 0;
  private isShow: Boolean = false;

  private routerSubscription: any;

  constructor(
    private stateService: StateService,
    private router: Router,
    private callService: CallService
  ) {}

  async ngOnInit(): Promise<void> {
    this.items$ = this.stateService.items$;
    await this.loadData();
    this.routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(async () => {
      if (this.router.url === '/tabs/states') {
        await this.loadData();
      }
    });
      
  }

  async loadData(){
    try{
      const result = await this.callService.call({
        method: 'get',
        isToken: true,
        endPoint:'allStates',
        body: {}
      })
      this.#showMessageBar(result['message'].description, result['message'].code);
      if(result['message'].code == 1 || result['message'].code == 3){
        return;
      }
      const data = result['data'].states;
      const states = (data ?? []).map((state: any, index: number) => ({
        id: `${state.id}`,
        name: state.username,
        image: state.profile_picture ?? 'https://unavatar.io/geddeu',
        items: (state.states ?? []).map((st: any, i: number) => ({
          id: `theid${i}`,
          subtitle: st.description,
          image: st.multimedia
        })) as Array<ICarouselItem>
      }));
      this.states = states;
    }catch(error){
      this.#showMessageBar('An error occurred when obtaining statuses', 1)
    }
  }

  #showMessageBar = (message: string, code : 0 | 1 | 3 = 0) => {
    if(this.isShow) return;
    
    this.isShow = true;
    this.alertCode = code;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isShow = false;
    }, 3000)
  }

  redirectToCreateState(){
    this.router.navigate(['/create-state'])
  }

}
