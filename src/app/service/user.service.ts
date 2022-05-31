import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/user';
import { ContractFarming } from '../model/contract-farming';
import { identifierName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // search = "http://localhost:3000/customer/search";
  search = "https://krishi-backend.herokuapp.com/customer/search";
  contractFarming = 'https://krishi-backend.herokuapp.com/contract/contract-farming';
 //contractFarming = "https://krishi-backend.herokuapp.com/contract/contract-farming";
  // profile = 'http://localhost:3000/customer/view/';
  profile = "https://krishi-backend.herokuapp.com/customer/view/"
  sign_Up = 'http://localhost:3000/customer/signup';
//  sign_Up = "https://krishi-backend.herokuapp.com/customer/signup";
  signIn = "https://krishi-backend.herokuapp.com/customer/signin";
  // signIn = 'http://localhost:3000/customer/signin';
  // favorite = "http://localhost:3000/fav/favorite";
  favorite = "https://krishi-backend.herokuapp.com/fav/favorite";
 // orderApi = "https://krishi-backend.herokuapp.com/order/pay";
  orderApi = 'http://localhost:3000/order/pay';

  // edit_profile = 'http://localhost:3000/customer/edit-profile/';
  edit_profile = "https://krishi-backend.herokuapp.com/customer/edit-profile/";

  // view_favorite = 'http://localhost:3000/fav/view/';
  view_favorite = "https://krishi-backend.herokuapp.com/fav/view/";
  storage_review = "http://localhost:3000/storage/review/";

  // search_product = "http://localhost:3000/customer/search-product";
  search_product = "https://krishi-backend.herokuapp.com/customer/search-product";
  //contractFarming = 'http://localhost:4000/user/contract-farming';
  // googleApi = "http://localhost:3000/customer/googleSignin";
  googleApi = "https://krishi-backend.herokuapp.com/customer/googleSignin";
  signin= "https://sociallogin1.herokuapp.com/user/googleSignin"
  // signin = "http://localhost:3000/googleLogin/googleSignin"
  constructor(private http: HttpClient) { }
  User_favorite_view(user_id:any){
    return this.http.get<any>(this.view_favorite+user_id);
  }
  User_favorite(tool_id:any,user_id:any){
    return this.http.post<any>(this.favorite,{
      tool_id:tool_id,
      user_id:user_id
    });
  }
  storageReview(id:any){
    return this.http.get<any>(this.storage_review+id);
  }
  storageR(id:any){
    return this.http.post<any>(this.storage_review+id,{

    });
  }
  User_product(text:any){
    return this.http.post<any>(this.search_product,{
      text:text
    });
  }
  User_search(){
    return this.http.get<any>(this.search);
  }
  User_google(user:any,email:any){
    return this.http.post<any>(this.googleApi,{
      name:user,
      email:email
    });
  }
  logIn(email:string,name:string,provider:string){
    return this.http.post<any>(this.signin,{email:email,name:name,provider:provider});
  }
  User_editProfile(user:User,id:any){

    return this.http.post<any>(this.edit_profile+id,user);
  }
  User_profile(id:any){
    return this.http.get<any>(this.profile+id);
  }
  User_Signup(user:User){
    return this.http.post<any>(this.sign_Up,user);
  }
  sign_In(user:User){
    return this.http.post<any>(this.signIn,user);
  }
  contract_Farming(formData:FormData){
    return this.http.post<any>(this.contractFarming,formData);
  }
  public checkToken():boolean{
    return !!sessionStorage.getItem('token');
  }
  public createOrder(amount:any){
  
    return this.http.post<any>(this.orderApi,{amount});
   }
 
}
