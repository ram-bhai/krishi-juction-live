import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractFarming } from 'src/app/model/contract-farming';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-contract-farming',
  templateUrl: './contract-farming.component.html',
  styleUrls: ['./contract-farming.component.css']
})
export class ContractFarmingComponent implements OnInit {
 contractFarming: ContractFarming = new ContractFarming("","","","","","","","","");
  constructor(private userService: UserService,  private notifyService:ToastrService) { }

  selectImage(event:any){
    if(event.target.files.length>0){
      this.contractFarming.image = event.target.files[0];
      console.log(this.contractFarming.image);
    }
  }
  

  public save(){
    const formData = new FormData();
    formData.append("name",this.contractFarming.name);
    formData.append("email",this.contractFarming.email);
    formData.append("mobile",this.contractFarming.mobile);
    formData.append("address",this.contractFarming.address);
    formData.append("area",this.contractFarming.area);
    formData.append("image",this.contractFarming.image);
    formData.append("description",this.contractFarming.description);
    formData.append("start_date",this.contractFarming.start_date);
    formData.append("end_date",this.contractFarming.end_date);
    this.userService.contract_Farming(formData).subscribe(data=>{
      console.log(formData);
      if(data)
      this.notifyService.success("Request sent..!!")
      else
      this.notifyService.error("Request aborted..!!")
     
    })
  }

  ngOnInit(): void {
  }

}
