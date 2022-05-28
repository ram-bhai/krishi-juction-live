import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private userService: UserService) { }
  product:any;
  ngOnInit(): void {
    const user_id = sessionStorage.getItem("id");
    this.userService.User_favorite_view(user_id).subscribe(data=>{
      alert(data);
      this.product = data
      console.log(this.product);
    })
  }

}
