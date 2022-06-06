import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Service } from '../model/service';
import { ServicesService } from '../service/services.service';

import { HttpErrorResponse } from '@angular/common/http';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {TermsConditionComponent} from '../terms-condition/terms-condition.component';
import { CommentComponent} from '../comment/comment.component';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare let Razorpay:any
@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  tools:any;
  paginate:any;
  totalLength?:number;
  page:number = 1;
  mobile:any;
  starRating = 0;

  constructor(private offcanvasService: NgbOffcanvas,private dataService:ServicesService,public dialog: MatDialog,private notifyService:ToastrService,private adminService : AdminService,private userService: UserService,private router:Router) { }


  service: Service = new Service("", "", "", "", false, false,"","");
  bookingDate:any;
  username:any;
  orderList:any=[];
  total:any;
  address:any;
  id:any= sessionStorage.getItem("id");
  tid:any;
  price:any;
  name:any;
  ngOnInit(): void {
    this.username = sessionStorage.getItem("name");
    this.adminService.service_Api().subscribe(data=>{
      this.tools = data
      this.totalLength =data.length;
    })
  }
  

  items:any=[]
  single_items:any='';
  closeResult='';
  duration:any;


  open(content:any) {
    if(sessionStorage.getItem('id')){
      this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.router.navigate(['sign-in']);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  isLoggedIn(){
    return this.userService.checkToken();
  }

  public checkWeight(event:any){
    
    if(event.target.value){
      this.total = this.price  * event.target.value*1;
      this.service.duration = event.target.value;
    }
  }
  setdata(items:any){
    this.single_items=items;
    console.log(items._id);
  }
  
  setData(id:any,price:any,name:any){
      this.tid = id;
      this.price = price;
      this.name = name;
      this.total = price;
      //dbcndbcndb
  }
   
  title = 'payment';
  onPay(amount:any){
   if(this.isLoggedIn()){
    this.userService.createOrder(amount).subscribe(data=>{
      console.log(data.id);
      console.log(data);
      
      var options = {
        
       "key": "rzp_test_MqoJug1nXNqVws", // Enter the Key ID generated from the Dashboard
       "amount": "10000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
       "currency": "INR",
       "name": "Acme Corp",
       "description": "Test Transaction",
       "image": "https://example.com/your_logo",
       "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
       "callback_url": "http://localhost:3000/order/payment-status",
       "prefill": {
           "name": "Devika Kushwah",
           "email": "devikakushwah29@gmail.com",
           "contact": "8770784399"
       },
       "notes": {
           "address": "Razorpay Corporate Office"
       },
       "theme": {
           "color": "#3399cc"
       }
   };
   
   var rzp1 = new Razorpay(options);
 
     rzp1.open();
    })
   }
   else{
     alert("First login required");
     this.router.navigate(['signIn']);
   }
  }
 
  service_item(id:any){
        this.router.navigate(['equipment-details',id]);
  }
  
  favorite(tool_id:any){
    const user_id = sessionStorage.getItem("id");
    this.userService.User_favorite(tool_id,user_id).subscribe(data=>{
      alert(data);
      alert("data saved");
    })
  }
  opentoDialog(){
    this.dialog.open(TermsConditionComponent);
  }
  openDialog(id:any): void {
    this.dialog.open(CommentComponent,{data:id});
  }
  
  selected:any;
  save(){
    
     this.onPay(this.total);
      this.orderList = [{bookingDate:this.bookingDate,tool_id:this.tid}];

      this.service.userId = this.id;
      this.service.payment = true;
      this.service.total = this.total;
     this.service.orderList = this.orderList;
     this.dataService.serviceOrder(this.service).subscribe(data =>{
      
       console.log(data);
       this.notifyService.success("Order Booked Successfully..!!")

      },err=>{
       console.log(err);
       if(err instanceof HttpErrorResponse){
         if(err.status == 400){
           this.notifyService.error("something happened...");
         }
         else  if(err.status == 404){
          this.notifyService.error("Something went wrong ...");
        }
         else if(err.status == 500){
           this.notifyService.warning("Something is wrong..!")
         
       }
     }
     })
  

  }
}


