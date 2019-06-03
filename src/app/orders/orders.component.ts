import { Component, OnInit, Inject } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';

export interface DialogData {
}
@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersDialogComponent implements OnInit {
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<OrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {

  }
  sendOrder() {
    this.dialogRef.close();
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
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.apicall.getCurrentWeather().subscribe(data => {
    // tslint:disable-next-line: forin
      for (let key in data) {
        this.data.push({key: key, value: data[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
  }

  popupOrderInfo() {
    const dialogRef = this.dialog.open(OrdersDialogComponent, {
      width: '800px',
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
