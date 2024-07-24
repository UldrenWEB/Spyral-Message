import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RequestPageRoutingModule } from './request-routing.module';

import { RequestPage } from './request.page';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { ContactComponent } from 'src/app/components/contact-component/contact.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RequestPageRoutingModule,
    InputComponent,
    MessageBarComponent,
    ContactComponent
  ],
  declarations: [RequestPage]
})
export class RequestPageModule {}