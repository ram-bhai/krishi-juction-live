import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HistoryDetailsComponent>,
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
