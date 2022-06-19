import { Injectable } from '@angular/core';
import { HttpInterceptor,  HttpRequest, HttpHandler} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor() { }
  intercept(request:HttpRequest<any>,next:HttpHandler){
    let tokenizedRequest = request.clone({
      setHeaders:{
        Authorization:'' + sessionStorage.getItem('token')
      }
    })
    return next.handle(tokenizedRequest);
  }
  
}
