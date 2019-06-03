import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishorderComponent } from './dishorder/dishorder.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrdersComponent } from './orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { MenuofdishesComponent } from './menuofdishes/menuofdishes.component';

const routes: Routes = [
  {
    path: '',
    component: DishorderComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path: 'dishes',
    component: MenuofdishesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
