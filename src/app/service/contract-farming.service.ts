import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractFarmingService {

  constructor(private http : HttpClient) { }
  landList = 'https://krishi-backend.herokuapp.com/contract/view-requests';

  landlist(): Observable<any>{
    return this.http.get(this.landList);
  }
}
