import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Service } from '../model/service';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from '../service/services.service';

import { HttpErrorResponse } from '@angular/common/http';
declare let Razorpay:any
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-equipements-details',
  templateUrl: './equipements-details.component.html',
  styleUrls: ['./equipements-details.component.css']
})
export class EquipementsDetailsComponent implements OnInit {

  constructor(private offcanvasService: NgbOffcanvas,private dataService:ServicesService,
  public dialog: MatDialog,private notifyService:ToastrService,private adminService : AdminService,private userService: UserService,private router:Router,
  private activatedRouter : ActivatedRoute) { }
  
  
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

   contact:any;     
  date:any;
  email:any;
  details:any;
  userId:any;
  user:any;
  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
   this.adminService.service_Details(this.id).subscribe(data=>{
     this.userId = sessionStorage.getItem('id')
     this.details = data;
     console.log(this.details);
   })
   
  }
  bookService(picker:any,name:any,email:any,mobile:any,address:any){
    console.log(picker._model.selection);
    console.log(name.value);
    console.log(email.value)
    console.log(address.value)
    console.log(mobile.value)
     this.adminService.customer_details(this.id,name.value,email.value,mobile.value,address.value,picker._model.selection).
     subscribe(result=>{
       console.log(result);
     })

  }
  
  setData(id:any,price:any,name:any){
    this.tid = id;
    this.price = price;
    this.name = name;
    this.total = price;
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
    this.notifyService.success("First Login required..!!")
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


service_item(id:any){
      this.router.navigate(['equipment-details',id]);
}



title = 'payment';
onPay(amount:any){
var amt = parseInt(amount);
if(this.isLoggedIn()){
this.userService.createOrder(amount).subscribe(data=>{
    console.log(data);
    var options = {
    "key": "rzp_test_MqoJug1nXNqVws", // Enter the Key ID generated from the Dashboard
    "amount": amt*10, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  
    handler: (response: {
      razorpay_payment_id: any;
      razorpay_order_id: any;
      razorpay_signature: any;
      razorpay_prefill: any;
    }) => {
      console.log(response);
      sessionStorage.setItem('payment-detail', JSON.stringify(response));
        this.userService.User_order_Sys(response).subscribe(data=>{

        });
    },

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
console.log(options);
var rzp1 = new Razorpay(options);

  rzp1.open()
    
  })
}
}
favorite(tool_id:any){
  const user_id = sessionStorage.getItem("id");
  this.userService.User_favorite(tool_id,user_id).subscribe(data=>{
    this.notifyService.success("Favorite ..!!")
    
  })
}

// openDialog(id:any): void {
//   this.dialog.open(CommentComponent,{data:id});
// }

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
         this.notifyService.warning("something is wrong...");
       }
       else  if(err.status == 404){
        this.notifyService.warning("something is wrong...");
      }
       else if(err.status == 500){
         this.notifyService.error("Something is wrong..!")
       // alert(err);
     }
   }
   })


}
}
