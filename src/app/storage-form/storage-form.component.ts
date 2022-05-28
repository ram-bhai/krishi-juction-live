import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage-form',
  templateUrl: './storage-form.component.html',
  styleUrls: ['./storage-form.component.css']
})
export class StorageFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items:any=[]

  fruits = [
    {name:'apple',selected:false},
    {name:'grape',selected:false},
    {name:'orange',selected:false},
    {name:'mango',selected:false},
    {name:'strawberry',selected:false},
    {name:'apple',selected:false},
    {name:'grape',selected:false},
    {name:'orange',selected:false},
    {name:'mango',selected:false},
    {name:'strawberry',selected:false}
  ]

  wiehgt(name:any,w:any){
    var temp:any={
      name:name,
      weight:w
    }
    this.items.push(temp);
    console.log(this.items);
  }

}
