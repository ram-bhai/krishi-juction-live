import {Router} from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StorageService} from '../service/storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-storage-comment',
  templateUrl: './storage-comment.component.html',
  styleUrls: ['./storage-comment.component.css']
})
export class StorageCommentComponent implements OnInit {
  sid:any;
  id:any = sessionStorage.getItem("id");
   comment:any;
   constructor(
     public dialogRef: MatDialogRef<StorageCommentComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,private notifyService:ToastrService,private service:StorageService,private router:Router
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
     this.close();
     this.notifyService.success("Sing In Successfully..!!")
     this.router.navigate(['storage']);
   }
 
}
