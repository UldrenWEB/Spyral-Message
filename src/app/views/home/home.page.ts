import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalContentComponent } from 'src/app/components/modal-component/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}


  add = () => {
    this.router.navigate(['/create-group'])
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: ModalContentComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }

}
