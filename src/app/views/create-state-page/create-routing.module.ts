import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStatePage } from './create.component';

const routes: Routes = [
  {
    path: '',
    component: CreateStatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStatePageRoutingModule {}
