import { Component, OnInit, Inject } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { MenuofdishesDialogComponent } from '../menuofdishes/menuofdishes.component';

export interface DialogData {
  myTextarea: string;
  name: string;
  typesOfShoes: string[];
  orderDay: string;
  dishes: [];
  whichMonthIsThis: number;
}
@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardDialogComponent  implements OnInit {
  constructor(
    public dialog: MatDialog,
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  dishescom = [];
  chooseDay: string;
  dishuserchoose = {};
  myTextarea: string;
  whichMonthIsThis: number;
  ngOnInit() {
    this.whichMonthIsThis = this.data.whichMonthIsThis;
    this.apicall.getDishes('', '', '').subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: forin
      for (let key in data.msg) {
        this.dishescom.push({key: key, value: data.msg[key]});
      }
    });
  }

  change() {
    console.log('changed');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  test(orderDay, dish) {
    console.log(this.dishuserchoose)
    console.log('hihi');
    this.chooseDay = orderDay;
    if (!(dish.key in this.dishuserchoose)) {
      this.dishuserchoose[dish.key] = dish;
      this.dishuserchoose[dish.key]['quantity'] = 1;
      this.dishuserchoose[dish.key]['onbehalf'] = 'Yourself';
      this.dishuserchoose[dish.key]['orderday'] = this.chooseDay;
      this.dishuserchoose[dish.key]['ordermonth'] = this.whichMonthIsThis;
    }
    else {
      delete this.dishuserchoose[dish.key];
    }
    console.log(this.dishuserchoose);
  }

  addMore(dish_code) {
    this.dishuserchoose[dish_code]['quantity']++;
    console.log(this.dishuserchoose[dish_code]['quantity']);
  }



  removeAdded(dish_code) {
    if (this.dishuserchoose[dish_code]['quantity'] > 1) {
      this.dishuserchoose[dish_code]['quantity']--;
      console.log(this.dishuserchoose[dish_code]['quantity']);
    }
  }

  openDialogCreateDish() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(MenuofdishesDialogComponent, {
      width: '500px',
      height: '620px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onKeyUp(event) {
    if(event.key === 'Shift'){
      //hihi
    }else {
      this.dishescom = [];
      console.log('hihi');
      setTimeout(() => {
        this.apicall.getDishes(this.myTextarea, '', '').subscribe(data => {
          console.log(data);
          // tslint:disable-next-line: forin
          for (let key in data.msg) {
            this.dishescom.push({key: key, value: data.msg[key]});
          }
        });
      });
    }
  }

  onSave(): void {
    console.log(this.dishuserchoose);
    this.apicall.postOrderInfo(this.dishuserchoose).subscribe(data => {
      console.log(data);
    });
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  dishes = [];
  isLoading = true;
  thisMonth = [];
  previousMonth = [];
  whichMonthIsThis: number;
  animal: string;
  name: string;
  myTextarea: string;
  constructor(
    private apicall: ApicallService,
    public dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit() {
    this.apicall.getCurrentWeather().subscribe(data => {
    // tslint:disable-next-line: forin
      for (let key in data.this_month) {
        this.thisMonth.push({key: key, value: data.this_month[key]});
      }
    // tslint:disable-next-line: forin
      for (let key in data.previous_month) {
        this.previousMonth.push({key: key, value: data.previous_month[key]});
      }
      this.whichMonthIsThis = data.which_month_is_this;
      setTimeout(() => { this.isLoading = false; }, 300);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
  }

  openDialog(orderDay) {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      width: '1000px',
      height: '600px',
      data: {
        myTextarea: this.myTextarea,
        name: this.name,
        animal: this.animal,
        dishes : this.dishes,
        orderDay : orderDay,
        whichMonthIsThis: this.whichMonthIsThis
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
