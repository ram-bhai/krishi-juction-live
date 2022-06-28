import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';
declare let Razorpay:any;

@Component({
  selector: 'app-storage-book',
  templateUrl: './storage-book.component.html',
  styleUrls: ['./storage-book.component.css']
})
export class StorageBookComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StorageBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyService:ToastrService,
    private storageService:StorageService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  total:any = 0 ;
  bookingDate:any;
  endingDate:any;
  items:any=[];
  valid:boolean = true;
  mobile:any;

  isLoggedIn(){
    return this.userService.checkToken();
  }

  public checkWeight(event:any, itemName:any){
    let button = document.getElementById('btn'+itemName) as HTMLButtonElement | null;
    if(event.target.value*1 > 100){
        if(button!=null)
        button.disabled = false;
    }else if(button!=null){
        button.disabled = true;
    }
  }

  itemsData(item:any,weight:any){
    var temp = {
      name:item.name,
      amount:item.charges,
      bookingDate:item.startdate,
      duration:item.enddate,
      weight:weight,
      // kg:item.weight
      kg:50
    }
    this.items.push(temp);
    var date1 = new Date(item.startdate);
    var date2 = new Date(item.enddate);
    var minusDate = date1.getTime() - date2.getTime();
    var totalDays = minusDate / (1000 * 3600 * 24);
    if(totalDays < 0) {
      totalDays *= -1;
    }
    
    this.calculate(totalDays);
  }

  calculate(day:any){
    var calc:number;
    
    for(let items of this.items){
      console.log(items);
      var temp = parseInt(items.weight) /parseInt(items.kg);
      console.log(temp)
      calc = temp*1 * items.amount;
      console.log("amount" +calc);
      this.total += calc*1*day;
    }
    console.log(day);
    console.log("total "+this.total);

    if(this.total > 0){
      this.valid = false;
    }
    else{ 
      this.valid = true;
    }

  }

  save(){
    this.dialogRef.close();
    if(this.isLoggedIn()){

     console.log(this.items);
     this.onPay(this.total);
     this.storageService.bookStorage(this.data._id,this.total,this.items,this.mobile).subscribe(data=>{
     
       console.log(data);
      //  this.notifyService.success("Order Booked Successfully..!!")

     },err=>{
      console.log(err);
      if(err instanceof HttpErrorResponse){
        if(err.status == 400){
          this.notifyService.error("something happend...");
        }
        else if(err.status == 500){
          this.notifyService.warning("Something is wrong..!")
        // alert(err);
      }
    }
     })
   }
   else{
       alert("You have to login first.");
   }
  
 }

 title = 'payment';
  onPay(amount:any){
   if(this.isLoggedIn()){
    this.userService.createOrder(amount).subscribe(data=>{
      console.log(data.id);
      console.log(data);
      
      var options = {
        
       "key": "rzp_test_MqoJug1nXNqVws", // Enter the Key ID generated from the Dashboard
       "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
            this.notifyService.success("Payment Successfully..!!")
             console.log(data);
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
   
   var rzp1 = new Razorpay(options);
 
     rzp1.open();
    })
   }
   
   else{
    this.notifyService.success("First Login is required..!!");
   }
  } 

}
