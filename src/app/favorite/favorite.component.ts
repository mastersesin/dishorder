import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../services/apicall/apicall.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  loading = true;
  data = [];
  constructor(private apicall: ApicallService) { }

  ngOnInit() {
    this.apicall.getCurrentWeather().subscribe(data => {
    // tslint:disable-next-line: forin
      for (let key in data) {
        this.data.push({key: key, value: data[key]});
      }
      setTimeout(() => { this.loading = false; }, 300);
    });
  }

}
