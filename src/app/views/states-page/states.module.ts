import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatesPage } from './states.page';

import { StatesPageRoutingModule } from './states-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatesPageRoutingModule
  ],
  declarations: [StatesPage]
})
export class StatesPageModule {}
