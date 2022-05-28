import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService} from './service/user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){}
  canActivate():boolean {
    if(this.userService.checkToken()){
      //  alert("token check true")
       return true;
     }
     else{
      //  alert("token check false");
       this.router.navigate(['sign-in']);
       return false;
     }
  
    return true;
  }
  
}
