import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from 'src/app/components/carousel-component/icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from 'src/app/components/state-component/carousel.const';

@Component({
  selector: 'app-states',
  templateUrl: 'states.page.html',
  styleUrls: ['states.page.scss']
})
export class StatesPage implements OnInit {
  items: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  states: Array<{_id: string, user: {_id: string, username: string}, multimedia: Array<{url: string, type: 'image'}>, description: string}> = [];

  constructor() {}

  //Aqui hara la consulta a los estados cada que cargue el componente
  ngOnInit(): void {
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

  openModal(id: string) {
    const modalTrigger = document.getElementById(`open-modal-${this.items}`) as HTMLIonModalElement;
    modalTrigger?.click();
  }

}
