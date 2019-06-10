import { Component, OnInit, Inject } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
export interface DialogData {
}
@Component({
  selector: 'app-suppliers-dialog',
  templateUrl: './suppliers-dialog.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersDialogComponent implements OnInit {
  defaultValue = 'VND';
  defaultAM = 'AM';
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<SuppliersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {

  }
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})

export class SuppliersComponent implements OnInit {
  loading = true;
  data = [];
  supplierOrderAmount = [
    ['TML', 8136000],
    ['HKT', 8538000],
  ];
  supplierDishes = [
    ['Beef', 10],
    ['Beefsteak', 8],
    ['Noodle', 5],
    ['Grill Pork', 4]
  ];
  myType = 'ColumnChart';
  myOptions = {
    //
  };
  orderAmountColumnName = ['Supplier', 'Total Amount'];
;  totalOrderColumnName = ['Order', 'Order'];
  dynamicResize = true;
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.apicall.getSuppliers().subscribe(data => {
    // tslint:disable-next-line: forin
      for (let key in data) {
        this.data.push({key: key, value: data[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SuppliersDialogComponent, {
      width: '500px',
      height: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
