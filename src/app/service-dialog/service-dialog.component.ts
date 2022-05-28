import { Component, OnInit } from '@angular/core';
import { Service } from '../model/service';
import { ServicesService } from '../service/services.service';
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent implements OnInit {

  constructor(private dataService:ServicesService) { }
  date:any;
  service: Service = new Service("", "", "", "", false, false,"","");
  ngOnInit(): void {
  }
   
    toolid:any="627f40f78aa45b949e824c68";
   orderList:any;
  id:any= sessionStorage.getItem("id");
  save(){
    
    this.orderList = [{bookingDate:this.date,tool_id:this.toolid}];
     this.service.userId = this.id;
    this.service.orderList = this.orderList;
    this.dataService.serviceOrder(this.service).subscribe(data =>{
      alert(data);
    }
    )
  }
}
