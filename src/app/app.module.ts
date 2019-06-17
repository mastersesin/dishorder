import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishorderComponent } from './dishorder/dishorder.component';
import { RegisterComponent } from './register/register.component';
import { ApicallService } from './services/apicall/apicall.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent, DashboardDialogComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoriteComponent } from './favorite/favorite.component';
import { OrdersComponent, OrdersDialogComponent } from './orders/orders.component';
import { SuppliersComponent, SuppliersDialogComponent } from './suppliers/suppliers.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from './material.module';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuofdishesComponent, MenuofdishesDialogComponent } from './menuofdishes/menuofdishes.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { HeadernavbarComponent } from './headernavbar/headernavbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    DishorderComponent,
    RegisterComponent,
    DashboardComponent,
    FavoriteComponent,
    OrdersComponent,
    SuppliersComponent,
    DashboardDialogComponent,
    MenuofdishesComponent,
    MenuofdishesDialogComponent,
    OrdersDialogComponent,
    HeadernavbarComponent,
    SuppliersComponent,
    SuppliersDialogComponent
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
    FormsModule,
    GoogleChartsModule,
    DragDropModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule
  ],
  entryComponents: [DashboardComponent, DashboardDialogComponent, MenuofdishesComponent,
    MenuofdishesDialogComponent, OrdersComponent, OrdersDialogComponent,SuppliersComponent,
     SuppliersDialogComponent],
  providers: [ApicallService],
  bootstrap: [AppComponent],
})
export class AppModule {}

