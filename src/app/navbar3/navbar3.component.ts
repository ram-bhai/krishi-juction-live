import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.css']
})
export class Navbar3Component implements OnInit {

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }

  fixed:boolean = false;
  toggle:boolean=false;

  toggleFun(){
    this.toggle =! this.toggle;
  }
  isLoggedIn():boolean{
    return this.userService.checkToken();
  }
  signOut(){
    if(confirm("Are you Sure ?")){
      sessionStorage.removeItem('token');
      this.router.navigate(['sign-in']);
    }
  }
  @HostListener('window:scroll',['$event']) onScroll(){
    if(window.scrollY > 100){
      this.fixed = true;
    }else{
      this.fixed = false;
    }
  }

}
