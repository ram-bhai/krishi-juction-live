import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  services:any;
  storages:any;
  text:any;
  
  constructor(private userService: UserService,private storageService: StorageService,private activatedRouter:ActivatedRoute,private router: Router) {
   this.text=  this.activatedRouter.snapshot.paramMap.get('search')
   router.events.subscribe(event=>{
    if(event instanceof NavigationEnd){
      this.text = this.activatedRouter.snapshot.paramMap.get('search')
      console.log(this.activatedRouter.snapshot.paramMap.get('search'));
  
      this.userService.User_product(this.text).subscribe(data=>{
        console.log(data.storages);
        console.log(data.services);
        this.storages = data.storage;
        this.services = data.service;
      });
    }
  });



    
}


    ngOnInit(): void {

      }
      showService(id:any){
        console.log(id);
        this.router.navigate(['equipment-details',id]);
      }
      showStorage(id:any){
        this.router.navigate(['storage-details',id]);
      }
}

