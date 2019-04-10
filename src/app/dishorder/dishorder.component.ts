import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dishorder',
  templateUrl: './dishorder.component.html',
  styleUrls: ['./dishorder.component.css']
})
export class DishorderComponent implements OnInit {
  loading = false;
  opacity = 1;
  visibility = 'hidden';
  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

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
