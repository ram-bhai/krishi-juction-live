import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toggle:boolean=false;
  public fixed:boolean=false;

  toggleFun(){
    this.toggle =! this.toggle;
  }

  @HostListener('window:scroll',['$event']) onScroll(){
    if(window.scrollY > 100){
      this.fixed = true;
    }else{
      this.fixed = false;
    }
  }

}
