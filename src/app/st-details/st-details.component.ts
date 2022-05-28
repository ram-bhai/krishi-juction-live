import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-st-details',
  templateUrl: './st-details.component.html',
  styleUrls: ['./st-details.component.css']
})
export class StDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    console.log(data);
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
