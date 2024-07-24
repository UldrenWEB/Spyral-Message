import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestPage } from './request.page';

const routes: Routes = [
  {
    path: '',
    component: RequestPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPageRoutingModule {}