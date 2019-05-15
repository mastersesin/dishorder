import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dishorder',
  templateUrl: './dishorder.component.html',
  styleUrls: ['./dishorder.component.css']
})
export class DishorderComponent implements OnInit {
  loading = false;
  opacity = 1;
  visibility = 'hidden';
  apiMsg = 'Incorrect authentication credentials.';
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
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
