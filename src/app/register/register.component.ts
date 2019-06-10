import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApicallService } from '../services/apicall/apicall.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  apiMsg: string;
  loading = false;
  opacity = 1;
  visibility = 'hidden';
  emailInput: string;
  passwordInput: string;
  firstName: string;
  familyName: string;
  constructor(
    private apicall: ApicallService,
    private router: Router
  ) { }

  ngOnInit() { }

  registerAndAlreadyHaveAccountButton() {
    this.loading = true;
    this.opacity = 0.3;
    this.visibility = 'visible';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
  changeBackgroundOpacity(): any {
    return { opacity: this.opacity };
  }

  registerButton() {
    this.loading = true;
    this.opacity = 0.3;
    this.visibility = 'visible';
    this.apicall.postRegisterInfo(this.emailInput, this.passwordInput, this.firstName, this.familyName).subscribe(data => {
    // tslint:disable-next-line: forin
      console.log(data.msg);
      this.apiMsg = data.msg;
      setTimeout(() => {
        this.loading = false;
        this.opacity = 1;
        this.visibility = 'hidden';
      }, 1000);
    });

  }

  loadingState(): any {
    return { visibility: this.visibility };
  }
}
