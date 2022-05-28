import {Router} from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServicesService} from '../service/services.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 sid:any;
 id:any = sessionStorage.getItem("id");
  comment:any;
  constructor(
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private service:ServicesService,private router:Router
  ) { 
    console.log(data);
    this.sid = data;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
  save(){

    this.service.reviewService(this.sid,this.id,this.comment).subscribe(result=>{
           alert("result./.."+result);
    
    })
    this.router.navigate(['services']);
  }

}
