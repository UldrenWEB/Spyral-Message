import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatesPage } from './states.page';

import { StatesPageRoutingModule } from './states-routing.module';
import { StateComponent } from 'src/app/components/state-component/state.component';
import { CarouselComponent } from 'src/app/components/carousel-component/carousel.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatesPageRoutingModule,
    StateComponent,
    CarouselComponent
  ],
  declarations: [StatesPage]
})
export class StatesPageModule {}
