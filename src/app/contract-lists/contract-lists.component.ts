import { Component, OnInit } from '@angular/core';
import { ContractFarmingService } from '../service/contract-farming.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-contract-lists',
  templateUrl: './contract-lists.component.html',
  styleUrls: ['./contract-lists.component.css']
})
export class ContractListsComponent implements OnInit {

  constructor(private contractFarmingService: ContractFarmingService,private userService: UserService) {
    this.contractFarmingService.getReq()
    .subscribe(data => {
      console.log(data);
      this.reqList = data;
      
    })
    
    this.contractFarmingService.landlist()
    .subscribe(data =>{
      this.approvedList = data;
    })
  }

  ngOnInit(): void {
  }

  count=0;
  reqList:any;
  list:any='';
  public approvedList:any[]=[];

  getDetail(list:any){
    this.list = list;
  }



  checkreq():boolean{
    for(var i=0;i<this.reqList.length;i++){
      if(this.reqList[i].userId == sessionStorage.getItem("id"))
        return false;
      if(this.count == 1)
        return false;
    }
    return true;
  }

  bookreq(id:any){
    var uid = this.userService.checkToken();
    if(uid){
      console.log("user id "+uid);
      console.log("contract id "+id);
      this.contractFarmingService.getlandreq(sessionStorage.getItem('id'),id)
      .subscribe(data =>{
        console.log(data);
        this.count = 1;
      })
    }
  }
}
