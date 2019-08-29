import { Component, OnInit, Inject } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { DashboardDialogComponent } from '../dashboard/dashboard.component';
import { NotificationsService } from '../services/notifications/notifications.service';

export interface DialogData {
  item: any;
}
@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersDialogComponent implements OnInit {
  all_user_order = [];
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<OrdersDialogComponent>,
    private notifications: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {
    console.log(this.data);
    this.apicall.getAllUserOrders(this.data['data'].value.supplier_code, this.data['data'].value.order_month, this.data['data'].value.order_day).subscribe(data => {
      for (const key in data.msg) {
        this.all_user_order.push({key, value: data.msg[key]});
      }
      console.log(this.all_user_order);
    });
  }
  delete_order(order_id) {
    console.log(order_id);
    this.apicall.deleteOrder(order_id).subscribe(data => {
      console.log(data);
      if (data.code === 24) {
        this.all_user_order = [];
        this.apicall.getAllUserOrders(this.data['data'].value.supplier_code, this.data['data'].value.order_month, this.data['data'].value.order_day).subscribe(data => {
          for (const key in data.msg) {
            this.all_user_order.push({key, value: data.msg[key]});
          }
          console.log(this.all_user_order);
        });
        this.notifications.showNotification('success', 'Order has been deleted' );
      } else if (data.code === 22) {
        this.notifications.showNotification('error', 'Permission denined' );
      }
    });
  }

  sendOrder() {
    this.dialogRef.close();
  }

  openDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      width: '1000px',
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading = true;
  data = [];
  all_order = [];
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.apicall.getAllOrders().subscribe(data => {
      for (const key in data.msg) {
        this.all_order.push({key, value: data.msg[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
    console.log(this.all_order);
  }

  popupOrderInfo(item) {
    const dialogRef = this.dialog.open(OrdersDialogComponent, {
      width: '800px',
      height: '600px',
      data: {data: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
