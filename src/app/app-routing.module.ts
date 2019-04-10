import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishorderComponent } from './dishorder/dishorder.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: DishorderComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
