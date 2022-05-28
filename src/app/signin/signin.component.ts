import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { User } from 'src/app/model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User = new User("", "", "", "", "", "");
  hide = true;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  loginForm!: FormGroup;
  name:any;
  provider:any;
  email:any;
  constructor(private userService: UserService, private router: Router, private socialAuthservice: SocialAuthService , private notifyService:ToastrService) { }
  
  ngOnInit(): void {
    
    this.socialAuthservice.authState.subscribe(data=>{
      this.socialUser=data
      alert(data);
      this.name = data.name;
      this.email = data.email;
      this.provider = data.provider
      console.log(data);
      this.userService.User_google(this.name,this.email).subscribe(data=>{
        this.notifyService.success("Sing In Successfully..!!")
        sessionStorage.setItem("token",data.token);
        sessionStorage.setItem("name",data.user.name)
        console.log()
        console.log(data);
        console.log("hellow admin" + this.socialUser);
        sessionStorage.setItem("id",data.user._id); 
        this.router.navigate(['']);
       },err=>{
        console.log(err);
        if(err instanceof HttpErrorResponse){
          if(err.status == 400){
            this.notifyService.error("user already exists...");
          }
          else if(err.status == 500){
            this.notifyService.warning("Something is wrong..!")
          // alert(err);
        }
      }
      })
   
    })
  }
    signIn(){
    
        this.userService.sign_In(this.user).subscribe(data=>{
          this.notifyService.success("Sing In Successfully..!!")
            sessionStorage.setItem("token",data.token);
             sessionStorage.setItem("name",data.user.name)
            console.log()
            console.log(data);
            console.log("hellow admin" + this.socialUser);
            sessionStorage.setItem("id",data.user._id); 
            this.router.navigate(['']);
        },err=>{
        console.log(err);
        if(err instanceof HttpErrorResponse){
          if(err.status == 400){

            this.notifyService.error("User does not exists..!")
          }
          if(err.status == 404){
            this.notifyService.error("Password does not match..!")

            this.notifyService.error("User not found")

          }
          else if(err.status == 500){
            this.notifyService.warning("Something is wrong..!")
          // alert(err);
        }
      }
    });
  
  }
  
  loginInWithGoogle(): void {
    this.socialAuthservice.signIn(GoogleLoginProvider.PROVIDER_ID);
   
  }

  refreshToken(): void {
    this.socialAuthservice.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(){
    this.socialAuthservice.signOut();
  }

}
