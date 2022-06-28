import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
import { StorageFormComponent } from '../storage-form/storage-form.component';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import {StorageCommentComponent} from '../storage-comment/storage-comment.component';
import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StorageBookComponent } from '../storage-book/storage-book.component';
declare let Razorpay:any
@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
totalLength?:number;
page:number =1;
price?:any;
starRating = 0;


  constructor(private notifyService:ToastrService,private offcanvasService: NgbOffcanvas,public dialog:MatDialog,public storageService: StorageService,private router:Router,private userService:UserService,private activatedRoute :ActivatedRoute) {

    this.storageService.getStorageById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
      this.storage = data;
      console.log(data);
    })

    this.loadData();
  }

  showSpinner = true;
  load = false;

  loadData() {
    return setTimeout(() => {
      this.showSpinner = false;
      this.load = true;
    }, 3000);
  }

  minDate = new Date().toJSON().slice(0, 10);
  bookingDate:any;
  endDate:any;

  dateValid(){
    if(this.bookingDate < this.minDate)
      this.bookingDate = '';
      if(this.endDate < this.minDate)
      this.endDate = '';
  }

  checks=[];
  service_item(id:any){
    
    console.log(id);
    this.router.navigate(['storage-details',id]);
  }
  ngOnInit(): void {
  }

  onChange(){
    
  }

  storage:any;

  items:any=[]
  single_items:any='';
  total:any ;
  mobile:any;
  duration:any = '7';
  id:any;
  closeResult = '';

  open(content:any){
    this.dialog.open(StorageBookComponent,{data:content});
  }

  // open(content:any) {
    
  //   if(sessionStorage.getItem('id')){
  //     this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });
  //   }else{
  //     this.router.navigate(['sign-in']);
  //   }
  // }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  isSelected(name:any,weight:any){
    console.log(name);
    console.log(weight);
    console.log(this.items);
  }
  isLoggedIn(){
    return this.userService.checkToken();
  }

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
    console.log("total"+this.total);
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
       else  if(err.status == 404){
        this.notifyService.warning("something happend...");
      }
       else if(err.status == 500){
         this.notifyService.warning("Something is wrong..!")
       // alert(err);
     }
   }
    });
  }

  itemsData(item:any,weight:any,index:any){
    var temp = {
      name:item.name,
      amount:item.charges,
      bookingDate:this.bookingDate,
      duration:this.endDate,
      weight:weight,
      // kg:item.weight
      kg:50
    }
    this.items.push(temp);
    var date1 = new Date(this.bookingDate);
    var date2 = new Date(this.endDate);
    var minusDate = date1.getTime() - date2.getTime();
    var totalDays = minusDate / (1000 * 3600 * 24);
    if(totalDays < 0) {
      totalDays *= -1;
    }
    
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
      
        console.log(data);
        this.notifyService.success("Order Booked Successfully..!!")

      },err=>{
       console.log(err);
       if(err instanceof HttpErrorResponse){
         if(err.status == 400){
           this.notifyService.error("something happend...");
         }
         else  if(err.status == 404){
          this.notifyService.warning("something happend...");
        }
         else if(err.status == 500){
           this.notifyService.warning("Something is wrong..!")
         // alert(err);
       }
     }
      })
    }
    else{
        this.router.navigate(['sign-in']);
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
 
  openDialog(id:any): void {
    this.dialog.open(StorageCommentComponent,{data:id});
  }
  
//   title = 'payment';
// onPay(amount:any){
//   var amt = parseInt(amount);
//   if(this.isLoggedIn()){
//   this.userService.createOrder(amount).subscribe(data=>{
//       console.log(data);
//        alert(data.id);
//       var options = {
//       "key": "rzp_test_MqoJug1nXNqVws", // Enter the Key ID generated from the Dashboard
//       "amount": "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       "currency": "INR",
//       "name": "Acme Corp",
//       "description": "Test Transaction",
//       "image": "https://example.com/your_logo",
//       "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       "callback_url": "http://localhost:3000/order/payment-status",
//       "prefill": {
//           "name": "Devika Kushwah",
//           "email": "devikakushwah29@gmail.com",
//           "contact": "8770784399"
//       },
//       "notes": {
//           "address": "Razorpay Corporate Office"
//       },
//       "theme": {
//           "color": "#bd1e51"
//       }
//   };
//   console.log(options);
//   alert("dear++++"+options);
//   var rzp1 = new Razorpay(options);

//     rzp1.open()
      
//     })
//   }
// }

trackByIndex(index: number, obj: any): any {
  // console.log(obj);
  return index;
}

  }