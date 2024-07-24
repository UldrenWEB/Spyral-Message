import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterImagePage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterImagePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterImagePageRoutingModule {}