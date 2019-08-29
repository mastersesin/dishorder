import { Component, ViewEncapsulation, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'local-weather-app';
  logedinstate = 'true';
  private notifier: NotifierService;
  constructor(
    private router: Router,
    notifier: NotifierService
  ) {
    this.notifier = notifier;
  }
  ngOnInit() {
    // This need to edit when path is longer than now
    // Active current in path button
    // setTimeout(() => {
    //   const currentPath = window.location.pathname;
    //   const needActivate = document.getElementById(currentPath.substr(1));
    //   needActivate.classList.add('active');
    // });
  }
  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}
