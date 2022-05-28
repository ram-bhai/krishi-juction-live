import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Service} from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
   
  constructor(private http: HttpClient) { }
  order = "https://krishi-backend.herokuapp.com/order/place-order";
  // order = "http://localhost:3000/order/place-order";
  view_history = "https://krishi-backend.herokuapp.com/order/view-order/";
  // view_history = "http://localhost:3000/order/view-order/";
  // review = "http://localhost:3000/service/review/"
  review = "https://krishi-backend.herokuapp.com/service/review/";
  serviceOrder(service:Service){
    return this.http.post<any>(this.order,service)
  }
  viewOrder(uid:any){
    return this.http.get<any>(this.view_history+uid)
  }

  reviewService(sid:any,id:any,comment:any){
    return this.http.post<any>(this.review+sid,{
      user:id,
      feedback:comment
    });
  }

}
