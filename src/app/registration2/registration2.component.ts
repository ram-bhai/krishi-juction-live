import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/model/user';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../token.service';


@Component({
  selector: 'app-registration2',
  templateUrl: './registration2.component.html',
  styleUrls: ['./registration2.component.css']
})
export class Registration2Component implements OnInit {


  constructor(private userService: UserService, private router: Router, private toster: ToastrService) { }

  ngOnInit(): void {
    function matchPassword() {  
      var pw1 = document.getElementById("pswd1");  
      var pw2 = document.getElementById("pswd2");  
      if(pw1 != pw2)  
      {   
        alert("Passwords did not match");  
      } else {  
        alert("Password created successfully");  
      }  
    }  
  }
  user: User = new User("", "", "", "", "", "");
  hide = true;
  hide2 = true;
  public register() {

    this.userService.User_Signup(this.user).subscribe(data => {
      console.log(data);
    
      this.router.navigate(['sign-in']);
    // },err=>{


      this.router.navigate(['signin']);
    }, err => {

      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          alert(err);
        }
        else if (err.status == 500) {

          alert(err);
        }
      }
    }
    )
  }

}
