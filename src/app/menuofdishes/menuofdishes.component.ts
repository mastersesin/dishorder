import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    let uniqueArray = value.filter(function (el, index, array) {
      return array.indexOf (el) == index;
    });

    return uniqueArray;
  }
}
export interface DialogData {
  dish_id: number;
  input_supplier: string;
  dish_name: string;
  dish_description: string;
  dish_tag: string;
  price: string;
  currency: string;
  imgURL: any;
  is_edit: boolean;
}
@Component({
  selector: 'app-menuofdishes-dialog',
  templateUrl: './menuofdishes-dialog.component.html',
  styleUrls: ['./menuofdishes.component.css']
})
export class MenuofdishesDialogComponent implements OnInit {
  errMsg = '';
  public imagePath;
  imgURL: any;
  public message: string;
  // Get Supplier as argument to this form
  dish_id: number;
  querystring_supplier = '';
  suppliers = [];
  input_supplier: string;
  dish_name: string;
  dish_description: string;
  dish_tag: string;
  price: string;
  currency: string;
  is_edit: boolean;
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<MenuofdishesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}


  ngOnInit() {
    this.apicall.getSuppliers(this.querystring_supplier).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (const key in data.msg) {
        this.suppliers.push({key, value: data.msg[key]});
      }
    });
    this.dish_id = this.data.dish_id;
    this.input_supplier = this.data.input_supplier;
    this.dish_name = this.data.dish_name;
    this.dish_description = this.data.dish_description;
    this.dish_tag = this.data.dish_tag;
    this.price = this.data.price;
    this.currency = this.data.currency;
    this.imgURL = this.data.imgURL;
    this.is_edit = this.data.is_edit
  }
  test() {

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
      console.log(this.imgURL)
    };
  }

  save() {
    if (this.is_edit && !this.imagePath) {
      console.log(this.suppliers);
      this.apicall.putDishInfo(
        this.dish_id,
        this.input_supplier,
        this.dish_name,
        this.dish_tag,
        this.dish_description,
        this.price,
        this.currency,
        ''
      ).subscribe(data => {
        if (data.code === 1) {
          this.dialogRef.close();
          setTimeout(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/dishes']));
          }, 500);
        } else {
          this.errMsg = '';
          setTimeout(() => { this.errMsg = data.msg; }, 300);
          console.log(data.msg);
        }
      });
    } else if ( this.is_edit && this.imagePath) {
      this.apicall.postImage(this.imagePath).subscribe(data => {
        if (data.code === 16) {
          this.apicall.putDishInfo(
            this.dish_id,
            this.input_supplier,
            this.dish_name,
            this.dish_tag,
            this.dish_description,
            this.price,
            this.currency,
            data.msg
          ).subscribe(data => {
            if (data.code === 1) {
              this.dialogRef.close();
              setTimeout(() => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/dishes']));
              }, 500);
            } else {
              this.errMsg = '';
              setTimeout(() => { this.errMsg = data.msg; }, 300);
              console.log(data.msg);
            }
          });
        }
      });
    } else if ( !this.is_edit && !this.imagePath) {
      console.log(this.input_supplier);
      this.apicall.postDishInfo(
        this.input_supplier,
        this.dish_name,
        this.dish_tag,
        this.dish_description,
        this.price,
        this.currency,
        ''
      ).subscribe(data => {
        console.log(data);
        if (data.code === 1) {
          this.dialogRef.close();
          setTimeout(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/dishes']));
          }, 500);
        } else {
          this.errMsg = '';
          setTimeout(() => { this.errMsg = data.msg; }, 300);
          console.log(data.msg);
        }
      });
    } else {
      this.apicall.postImage(this.imagePath).subscribe(data => {
        if (data.code === 16) {
          this.apicall.postDishInfo(
            this.input_supplier,
            this.dish_name,
            this.dish_tag,
            this.dish_description,
            this.price,
            this.currency,
            data.msg
          ).subscribe(data => {
            if (data.code === 1) {
              this.dialogRef.close();
              setTimeout(() => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/dishes']));
              }, 500);
            } else {
              this.errMsg = '';
              setTimeout(() => { this.errMsg = data.msg; }, 300);
              console.log(data.msg);
            }
          });
        }
      });
    }
  }
}

@Component({
  selector: 'app-menuofdishes',
  templateUrl: './menuofdishes.component.html',
  styleUrls: ['./menuofdishes.component.css']
})
export class MenuofdishesComponent implements OnInit {
  all_dish = [];
  all_supplier = [];
  all_dish_tag = []
  loading = true;
  supplier_search = [];
  tag_search = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private apicall: ApicallService
  ) { }

  ngOnInit() {
    this.apicall.getDishes('', '', '').subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (const key in data.msg) {
        this.all_dish.push({key, value: data.msg[key]});
      }
    });
    this.apicall.getTags('').subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (const key in data.msg) {
        this.all_dish_tag.push({key, value: data.msg[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
    this.apicall.getSuppliers('').subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (const key in data.msg) {
        this.all_supplier.push({key, value: data.msg[key]});
      }
    });
    console.log(this.all_supplier)
  }

  clear_search(){
    this.supplier_search = [];
    this.tag_search = [];
    setTimeout(() => {
      this.apicall.getDishLay(this.supplier_search, this.tag_search).subscribe(data => {
        this.all_dish = [];
        for (const key in data.msg) {
          this.all_dish.push({key, value: data.msg[key]});
        }
      });
    ; }, 300);
  }

  addSupplierNameToSearch(name) {
    console.log(name)
    if (!(this.supplier_search.indexOf(name) !== -1)) {
      this.supplier_search.push(name);
      console.log(this.supplier_search)
    } else {
        delete this.supplier_search[this.supplier_search.indexOf(name)];
    }
    setTimeout(() => {
      this.apicall.getDishLay(this.supplier_search, this.tag_search).subscribe(data => {
        this.all_dish = [];
        for (const key in data.msg) {
          this.all_dish.push({key, value: data.msg[key]});
        }
      });
    ; }, 300);
  }
  addTagNameToSearch(name) {
    if (!(this.tag_search.indexOf(name) !== -1)) {
      this.tag_search.push(name);
      console.log(this.tag_search)
    } else {
        delete this.tag_search[this.tag_search.indexOf(name)];
    }
    setTimeout(() => {
      this.apicall.getDishLay(this.supplier_search, this.tag_search).subscribe(data => {
        this.all_dish = [];
        for (const key in data.msg) {
          this.all_dish.push({key, value: data.msg[key]});
        }
      });
    ; }, 300);
  }

  test(){

  }

  checkStateSupplier(supplier_name){
    console.log(supplier_name);
    return this.supplier_search.indexOf(supplier_name) !== -1;
  }

  checkStateTag(tag_name) {
    return this.tag_search.indexOf(tag_name) !== -1;
  }

  openDialog(dish_object) {
    if (dish_object){
      console.log(dish_object)
      const dialogRef = this.dialog.open(MenuofdishesDialogComponent, {
        width: '500px',
        height: '620px',
        data: {
          dish_id : dish_object.value.dish_id,
          input_supplier: dish_object.value.supplier_code,
          dish_name: dish_object.value.dish_name,
          dish_description: dish_object.value.dish_description,
          dish_tag: dish_object.value.tags_name,
          price: dish_object.value.unit_price,
          currency: dish_object.value.currency,
          imgURL : dish_object.value.image_URL,
          is_edit: true
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(MenuofdishesDialogComponent, {
        width: '500px',
        height: '620px',
        data: {currency: 'VND'}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
