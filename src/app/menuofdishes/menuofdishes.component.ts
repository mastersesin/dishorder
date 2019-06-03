import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../services/apicall/apicall.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';

export interface DialogData {
}
@Component({
  selector: 'app-menuofdishes-dialog',
  templateUrl: './menuofdishes-dialog.component.html',
  styleUrls: ['./menuofdishes.component.css']
})
export class MenuofdishesDialogComponent implements OnInit {
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<MenuofdishesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {

  }
}

@Component({
  selector: 'app-menuofdishes',
  templateUrl: './menuofdishes.component.html',
  styleUrls: ['./menuofdishes.component.css']
})
export class MenuofdishesComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(MenuofdishesDialogComponent, {
      width: '500px',
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
