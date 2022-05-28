import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { StorageService } from '../service/storage.service';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
import { StorageFormComponent } from '../storage-form/storage-form.component';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../service/user.service';
import {StorageCommentComponent} from '../storage-comment/storage-comment.component';
import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
declare let Razorpay:any
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit {
  constructor(private offcanvasService: NgbOffcanvas,public dialog:MatDialog,
    public storageService: StorageService,private router:Router,
    private userService:UserService,private activatedRoute :ActivatedRoute,
    private adminService : AdminService,private notifyService:ToastrService) {}

 
  id:any;
   contact:any;     
  date:any;
  email:any;
  details:any;
  userId:any;
  user:any;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   this.adminService.storage_Details(this.id).subscribe(data=>{
     this.userId = sessionStorage.getItem('id')
     this.details = data;
     console.log(data);
     console.log(this.details[0].items[0].name);
     
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
  storage:any;

  items:any=[]
  single_items:any='';
  total:any=0 ;
  mobile:any;
  duration:any = '7';
  ide:any;
  closeResult = '';

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


  wiehgt(name:any,w:any,charges:any,kg:any){
    var temp:any={
      name:name,
      weight:w,
      amount:charges,
      kg:kg
    }
    this.items.push(temp);
    console.log(this.items);
    // this.calculate();
  }

  isSelected(name:any,weight:any){
    console.log(name);
    console.log(weight);
    console.log(this.items);
  }
  isLoggedIn(){
    return this.userService.checkToken();
  }
  // open_dialog(){
  //   this.dialog.open(StorageFormComponent,{
  //     disableClose:false
  //   });
  // }

  setdata(items:any){
    this.single_items=items;
    console.log(items._id);
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
    console.log(this.total);
  }

  book(){
    console.log(this.storage.id);
    this.storageService.bookStorage(this.single_items._id,this.total,this.items,this.mobile)
    .subscribe(data =>{
    
      console.log(data);
      this.notifyService.success("Order Booked Successfully..!!")

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
    });
  }

  itemsData(item:any,bookingDate:any,endDate:any,weight:any,index:any){
    var temp = {
      name:item.name,
      amount:item.charges,
      bookingDate:bookingDate,
      duration:endDate,
      weight:weight,
      kg:item.weight
    }
    this.items.push(temp);
    var date1 = new Date(bookingDate);
    var date2 = new Date(endDate);
    var minusDate = date1.getTime() - date2.getTime();
    var totalDays = minusDate / (1000 * 3600 * 24);
    if(totalDays < 0) {
      totalDays *= -1;
    }
    alert(totalDays);
    this.calculate(totalDays);
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
  save(){
     if(this.isLoggedIn()){

      console.log(this.items);
      this.onPay(this.total);
      this.storageService.bookStorage(this.single_items._id,this.total,this.items,this.mobile).subscribe(data=>{
        alert("result++++"+data);
        console.log(data);
      })
    }
    else{
        this.router.navigate(['sign-in']);
    }
   
  }
  openDialog(id:any): void {
    this.dialog.open(StorageCommentComponent,{data:id});
  }
  
  title = 'payment';
onPay(amount:any){
  var amt = parseInt(amount);
  if(this.isLoggedIn()){
  this.userService.createOrder(amount).subscribe(data=>{
      console.log(data);
       alert(data.id);
      var options = {
      "key": "rzp_test_MqoJug1nXNqVws", // Enter the Key ID generated from the Dashboard
      "amount": amt*10, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
  console.log(options);
  alert("dear++++"+options);
  var rzp1 = new Razorpay(options);

    rzp1.open()
      
    })
  }
}

trackByIndex(index: number, obj: any): any {
  console.log(obj);
  return index;
}

}