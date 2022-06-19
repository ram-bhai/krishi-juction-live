import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractFarmingService {

  constructor(private http : HttpClient) { }
  landList = 'https://krishi-backend.herokuapp.com/contract/view-requests';
  landreq = "http://localhost:3000/farmrequest/deal/";
  getreq = "http://localhost:3000/farmrequest/book-list/";

  landlist(): Observable<any>{
    return this.http.get(this.landList);
  }

  getlandreq(uid:any,cid:any): Observable<any>{
    return this.http.post(this.landreq+uid+"/"+cid,{});
  }

  getReq():Observable<any>{
    return this.http.get(this.getreq+sessionStorage.getItem('id'));
  }
}
