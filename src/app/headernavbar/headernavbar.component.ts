import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headernavbar',
  templateUrl: './headernavbar.component.html',
  styleUrls: ['./headernavbar.component.css']
})
export class HeadernavbarComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
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

  logout() {
    localStorage.clear();
    this.router.navigate((['/']));
  }
}
