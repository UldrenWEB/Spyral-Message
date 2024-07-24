import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarouselItem } from 'src/app/components/carousel-component/icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from 'src/app/components/state-component/carousel.const';
import { CAROUSEL_DATA_ITEMS as bebe } from 'src/app/components/state-component/carousel2.const';
import { StateService } from 'src/app/service/StateService';

@Component({
  selector: 'app-states',
  templateUrl: 'states.page.html',
  styleUrls: ['states.page.scss']
})
export class StatesPage implements OnInit {
  items: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  items2: ICarouselItem[] = bebe;
  states: Array<{_id: string, user: {_id: string, username: string}, multimedia: Array<{url: string, type: 'image'}>, description: string}> = [];
  items$: Observable<ICarouselItem[]> = new Observable<ICarouselItem[]>();
  
  constructor(
    private stateService: StateService,
    private router: Router
  ) {}

  //Aqui hara la consulta a los estados cada que cargue el componente
  ngOnInit(): void {
    this.items$ = this.stateService.items$;
    this.states = [
      {_id: 'fdsalkfjal', user: {
        _id: 'fadfajlksdal',
        username: 'Uldren Gedde',
      }, 
      multimedia: [
        {
        url: 'https://unavatar.io/geddeu',
        type: 'image'
      },
        {
        url: 'https://unavatar.io/geddeu',
        type: 'image'
      },
        {
        url: 'https://unavatar.io/geddeu',
        type: 'image'
      }
    ],
      description: 'Mi mensaje iria aqui para explicar el estado'
    },
      {_id: 'fdsalkfjal', user: {
        _id: 'fadfajlksdal',
        username: 'Uldren Gedde',
      }, 
      multimedia: [{
        url: 'https://unavatar.io/erikatourt',
        type: 'image'
      }],
      description: 'Mi mensaje iria aqui para explicar el estado'
    },
      {_id: 'fdsalkfjal', user: {
        _id: 'fadfajlksdal',
        username: 'Uldren Gedde',
      }, 
      multimedia: [{
        url: 'https://unavatar.io/pedro',
        type: 'image'
      }],
      description: 'Mi mensaje iria aqui para explicar el estado'
    },
    
    ]
  }

  redirectToCreateState(){
    this.router.navigate(['/create-state'])
  }

}
