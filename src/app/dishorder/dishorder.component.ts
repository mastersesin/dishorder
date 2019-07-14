import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApicallService } from '../services/apicall/apicall.service';

@Component({
  selector: 'app-dishorder',
  templateUrl: './dishorder.component.html',
  styleUrls: ['./dishorder.component.css']
})
export class DishorderComponent implements OnInit {
  useremail_input = '';
  userpassword_input = '';
  loading = false;
  opacity = 1;
  visibility = 'hidden';
  apiMsg = '';
  constructor(
    private apicall: ApicallService,
    private router: Router
  ) { }

  ngOnInit() {
    const loginstatus = localStorage.getItem('isLogedIn');
    if (loginstatus === 'true') {
      console.log('routebyoninit');
      this.router.navigate(['/dashboard']);
    }
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.signin();
    }
  }

  signin() {
    this.loading = true;
    this.opacity = 0.3;
    this.visibility = 'visible';
    this.apicall.postLoginInfo(this.useremail_input, this.userpassword_input).subscribe(data => {
    // tslint:disable-next-line: forin
      if (data.code !== 6) {
        this.apiMsg = data.msg;
      }
      else {
        localStorage.setItem('isLogedIn', 'true');
        localStorage.setItem('token', data.msg);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 300);
      }
      setTimeout(() => {
        this.loading = false;
        this.opacity = 1;
        this.visibility = 'hidden';
      }, 300);
    });
  }

  registerAndAlreadyHaveAccountButton() {
    this.loading = true;
    this.opacity = 0.3;
    this.visibility = 'visible';
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 500);
  }

  changeBackgroundOpacity(): any {
    return { opacity: this.opacity };
  }

  loadingState(): any {
    return { visibility: this.visibility };
  }
}
