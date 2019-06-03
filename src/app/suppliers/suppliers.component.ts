import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';

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
  constructor(private apicall: ApicallService) { }

  ngOnInit() {
    this.apicall.getSuppliers().subscribe(data => {
    // tslint:disable-next-line: forin
      for (let key in data) {
        this.data.push({key: key, value: data[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
  }

}
