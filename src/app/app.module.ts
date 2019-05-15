import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishorderComponent } from './dishorder/dishorder.component';
import { RegisterComponent } from './register/register.component';
import { ApicallService } from './services/apicall/apicall.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrdersComponent } from './orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DemoMaterialModule } from './material.module';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DishorderComponent,
    RegisterComponent,
    DashboardComponent,
    FavoriteComponent,
    OrdersComponent,
    SuppliersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DemoMaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [ApicallService],
  bootstrap: [AppComponent],
})
export class AppModule {}

