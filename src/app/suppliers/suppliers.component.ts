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
  defaultValueCurrency = 'VND';
  defaultAM = 'AM';
  public imagePath;
  imgURL: any;
  public message: string;
  code: string;
  name: string;
  email_address: string;
  phone: string;
  contact_name: string;
  currency: string;
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<SuppliersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {

  }
  preview(files) {
    var mimeType = files[0].type;
    var reader = new FileReader();
    if (files.length === 0){
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  save() {
    console.log(this.imagePath);
    this.apicall.postImage(this.imagePath).subscribe(data => {
      console.log(data);
      if (data.code == 16) {
        this.apicall.postSupplierInfo(
          this.code,
          this.name,
          this.email_address,
          this.phone,
          this.contact_name,
          this.defaultValueCurrency,
          data.msg).subscribe(data =>{
            console.log(data);
          }
        )
      }
    });
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
  querystring_supplier = '';
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    console.log(this.querystring_supplier);
    this.apicall.getSuppliers(this.querystring_supplier).subscribe(data => {
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
