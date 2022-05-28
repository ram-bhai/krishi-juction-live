import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

import {UserService} from '../service/user.service';
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  hide=true;

  constructor(private userService: UserService) { }
    user:User= new User("","","","","","");

  ngOnInit(): void {
  }
    public register(){
      alert("data");
      this.userService.User_Signup(this.user).subscribe(data=>{
        alert(data.msg);
        alert(data);
        if(!data)
        alert("data not found");
      })
    }
  // public signInUser(){
  //   this._authService.signInUser(this.user).subscribe(data=>{
  //     sessionStorage.setItem('token',data.token);
  //     sessionStorage.setItem('userId',data.result._id);
  //     this.taoster.success("Login Success","Success");
  //     this.router.navigate(['dashboard']);
  //   },err=>{
  //     console.log(err);
  //     if(err instanceof HttpErrorResponse){
  //       if(err.status == 401){
  //         this.taoster.error("Invalid User","Error");
  //       }
  //       else if(err.status == 500){
  //         this.taoster.error("Internal Server Error","Error");

  //       }
  //     }
  //   });
  // }

}
