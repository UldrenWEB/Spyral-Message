import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';

import { ChatPageRoutingModule } from './chat-routing.module';
import { ChatComponent } from 'src/app/components/chat-component/chat.component';
import { SendComponent } from 'src/app/components/send-component/send.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatPageRoutingModule,
    ChatComponent,
    SendComponent
  ],
  declarations: [ChatPage]
})
export class HomePageModule {}
