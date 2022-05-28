import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  takeapi = "https://krishi-backend.herokuapp.com/storage/view-storage";
  // takeapi = "http://localhost:3000/storage/view-storage";
  // customerStorage = "http://localhost:3000/booked-storage/add/";
  customerStorage = "https://krishi-backend.herokuapp.com/booked-storage/add/";
  // userStorage = "http://localhost:3000/booked-storage/view-booked/";
  userStorage = "https://krishi-backend.herokuapp.com/booked-storage/view-booked/";
  storagebyId = "https://krishi-backend.herokuapp.com/storage/view-storage/";
  // storagebyId = "http://localhost:3000/storage/view-storage/"
  // review = "http://localhost:3000/storage/review/";
  review = "https://krishi-backend.herokuapp.com/storage/review/";
  constructor(private http:HttpClient) { }
  reviewService(sid:any,id:any,comment:any){
    return this.http.post<any>(this.review+sid,{
      user:id,
      feedback:comment
    });
  }
  getStorage():Observable<any>{
    return this.http.get(this.takeapi)
  }

  bookStorage(sid:any,total:any,items:any,mobile:any):Observable<any>{
    var uid = sessionStorage.getItem('id');
    return this.http.post(this.customerStorage+''+uid+'/'+sid,{items,total,mobile})
  }
  getBookedStorage():Observable<any>{
    return this.http.get(this.userStorage+''+sessionStorage.getItem('id'));
  }

  getStorageById(id:any):Observable<any>{
    console.log(id);
    return this.http.get(this.storagebyId+""+id);
  }
}
