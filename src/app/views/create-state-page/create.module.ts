import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateStatePage } from './create.component';

import { CreateStatePageRoutingModule } from './create-routing.module';
import { ChatComponent } from 'src/app/components/chat-component/chat.component';
import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CreateStatePageRoutingModule,
    ChatComponent,
    InputComponent,
    MessageBarComponent
  ],
  declarations: [CreateStatePage]
})
export class HomePageModule {}