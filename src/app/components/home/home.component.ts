import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 videoPlaying:number =1;

  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

   openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '800px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.restoreFocus = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }

   nextVideo(){
    if(this.videoPlaying<3)
    this.videoPlaying++;
    else this.videoPlaying=1;
  }

  
}
