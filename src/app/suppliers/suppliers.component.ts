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
