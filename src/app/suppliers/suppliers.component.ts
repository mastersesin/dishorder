import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
export interface DialogData {
  current_code: string;
  code: string;
  name: string;
  email_address: string;
  phone: string;
  contact_name: string;
  currency: string;
  min_quantity: string;
  min_amount: string;
  deadline: string;
  imgURL: any;
  is_edit: boolean;
}
@Component({
  selector: 'app-suppliers-dialog',
  templateUrl: './suppliers-dialog.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersDialogComponent implements OnInit {
  errMsg = ' ';
  testErr = false;
  public imagePath;
  imgURL: any;
  public message: string;
  current_code: string;
  code: string;
  name: string;
  email_address: string;
  phone: string;
  contact_name: string;
  currency: string;
  min_quantity: string;
  min_amount: string;
  deadline: string;
  is_edit: boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<SuppliersDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.current_code = this.data.code;
    this.code = this.data.code;
    this.name = this.data.name;
    this.email_address = this.data.email_address;
    this.phone = this.data.phone;
    this.contact_name = this.data.contact_name;
    this.currency = this.data.currency;
    this.min_quantity = this.data.min_quantity;
    this.min_amount = this.data.min_amount;
    this.deadline = this.data.deadline;
    this.imgURL = this.data.imgURL;
    this.is_edit = this.data.is_edit;
  }
  test(){
    console.log(this.code);
  }
  preview(files) {
    let mimeType = files[0].type;
    let reader = new FileReader();
    if (files.length === 0) {
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
    return;
    if (this.is_edit && !this.imagePath) {
      this.apicall.putSupplierInfo(
        this.current_code,
        this.code,
        this.name,
        this.email_address,
        this.phone,
        this.contact_name,
        this.currency,
        this.min_quantity,
        this.min_amount,
        this.deadline,
        ''
        // data.msg // API return img_URL
        ).subscribe(data => {
          console.log(data);
        }
      );
    } else if ( this.is_edit && this.imagePath ) {
      this.apicall.postImage(this.imagePath).subscribe(data => {
        if (data.code === 16) {
          this.apicall.putSupplierInfo(
            this.current_code,
            this.code,
            this.name,
            this.email_address,
            this.phone,
            this.contact_name,
            this.currency,
            this.min_quantity,
            this.min_amount,
            this.deadline,
            data.msg
            ).subscribe(data => {
              console.log(data);
            }
          );
        }
      });
    } else {
    this.apicall.postImage(this.imagePath).subscribe(data => {
      if (data.code === 16) {
          this.apicall.postSupplierInfo(
            this.code,
            this.name,
            this.email_address,
            this.phone,
            this.contact_name,
            this.currency,
            this.min_quantity,
            this.min_amount,
            this.deadline,
            data.msg // API return img_URL
            ).subscribe(data => {
              console.log(data);
            }
          );
        }
      });
    }
    this.dialogRef.close();
    setTimeout(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/suppliers']));
    }, 500);
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
  totalOrderColumnName = ['Order', 'Order'];
  dynamicResize = true;
  querystring_supplier = '';
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.apicall.getSuppliers(this.querystring_supplier).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (const key in data.msg) {
        this.data.push({key, value: data.msg[key]});
      }
      console.log(this.data);
      setTimeout(() => { this.loading = false; }, 300);
    });
  }

  openDialog(supplier_object) {
    if (supplier_object){
      const dialogRef = this.dialog.open(SuppliersDialogComponent, {
        width: '500px',
        height: '700px',
        data: {
          current_code : supplier_object.value.code,
          code : supplier_object.value.code,
          name: supplier_object.value.name,
          email_address: supplier_object.value.email_address,
          phone: supplier_object.value.phone,
          contact_name: supplier_object.value.contact_name,
          currency: supplier_object.value.currency,
          min_quantity: supplier_object.value.minimum_order_quantity,
          min_amount: supplier_object.value.minimum_order_amount,
          deadline: supplier_object.value.order_time_deadline,
          imgURL: supplier_object.value.image_URL,
          is_edit : true
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(SuppliersDialogComponent, {
        width: '500px',
        height: '700px',
        data: {currency: 'VND'}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
