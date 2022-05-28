import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public fixed:boolean = false;

  @HostListener('window:scroll',['$event']) onScroll(){
    if(window.scrollY > 100){
      this.fixed = true;
    }else{
      this.fixed=false;
    }
  }

}
