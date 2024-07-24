import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateStatePage } from './create.component';

import { CreateStatePageRoutingModule } from './create-routing.module';
import { ChatComponent } from 'src/app/components/chat-component/chat.component';
import { InputComponent } from 'src/app/components/input-component/input.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CreateStatePageRoutingModule,
    ChatComponent,
    InputComponent
  ],
  declarations: [CreateStatePage]
})
export class HomePageModule {}