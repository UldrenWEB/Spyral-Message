import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage} from './profile.page';

import { InputComponent } from 'src/app/components/input-component/input.component';
import { MessageBarComponent } from 'src/app/components/message-bar/message-bar.component';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { register } from 'swiper/element/bundle';


register();
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    InputComponent,
    MessageBarComponent,
  ],
  declarations: [ProfilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePageModule {}