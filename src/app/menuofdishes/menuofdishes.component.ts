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
  public imagePath;
  imgURL: any;
  public message: string;
  constructor(
    private apicall: ApicallService,
    public dialogRef: MatDialogRef<MenuofdishesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  defaultValue = 'VND';


  ngOnInit() {

  }
  preview(files) {
    var mimeType = files[0].type;
    var reader = new FileReader();
    if (files.length === 0){
      return;
    }
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  save() {
    console.log(this.imagePath);
    this.apicall.postImage(this.imagePath).subscribe(data => {
      console.log(data);
    });
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
      height: '680px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
