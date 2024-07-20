import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartupPage } from './startup.page';

import { StartupPageRoutingModule } from './startup-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StartupPageRoutingModule,
  ],
  declarations: [StartupPage]
})
export class StartupPageModule {}