import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'local-weather-app';
  logedinstate = 'true';
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    // This need to edit when path is longer than now
    // Active current in path button
    setTimeout(() => {
      const currentPath = window.location.pathname;
      const needActivate = document.getElementById(currentPath.substr(1));
      needActivate.classList.add('active');
    });
  }

  onClickNavTabs(id) {
    console.log(id);
    const elementCurrentActive = document.getElementsByClassName('active')[0];
    try {
      elementCurrentActive.className = '';
    } catch (err) {
      console.log('hihi');
    }
    const elementActive = document.getElementById(id);
    elementActive.classList.add('active');
    this.router.navigate((['/' + id]));
  }
}
