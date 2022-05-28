import { Component, OnInit } from '@angular/core';
import {StorageService} from '../service/storage.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StDetailsComponent } from '../st-details/st-details.component';

@Component({
  selector: 'app-my-storage',
  templateUrl: './my-storage.component.html',
  styleUrls: ['./my-storage.component.css']
})
export class MyStorageComponent implements OnInit {

  products:any='';

  constructor(private storage: StorageService,private dialog: MatDialog) {
    this.storage.getBookedStorage()
    .subscribe(data=>{
      this.products = data;
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

  openDialog(product:any){
    this.dialog.open(StDetailsComponent,{data:product});
  }


}
