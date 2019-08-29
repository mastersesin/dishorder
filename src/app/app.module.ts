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
import { FilterPipePipe } from './filter-pipe.pipe';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 50,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
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
    SuppliersDialogComponent,
    FilterPipePipe
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
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  entryComponents: [DashboardComponent, DashboardDialogComponent, MenuofdishesComponent,
    MenuofdishesDialogComponent, OrdersComponent, OrdersDialogComponent,SuppliersComponent,
     SuppliersDialogComponent],
  providers: [ApicallService],
  bootstrap: [AppComponent],
})
export class AppModule {}

