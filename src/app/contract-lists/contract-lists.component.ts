import { Component, OnInit } from '@angular/core';
import { ContractFarmingService } from '../service/contract-farming.service';

@Component({
  selector: 'app-contract-lists',
  templateUrl: './contract-lists.component.html',
  styleUrls: ['./contract-lists.component.css']
})
export class ContractListsComponent implements OnInit {

  constructor(private contractFarmingService: ContractFarmingService) { 
    this.contractFarmingService.landlist()
    .subscribe(data =>{
      this.approvedList = data;
    })
  }

  ngOnInit(): void {
  }

  list:any='';
  public approvedList:any[]=[];

  getDetail(list:any){
    this.list = list;
  }
}
