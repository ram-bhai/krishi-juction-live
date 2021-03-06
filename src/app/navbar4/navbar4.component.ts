import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute ,NavigationStart, Event as NavigationEvent} from '@angular/router';
import { UserService } from '../service/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import {Location} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare var webkitSpeechRecognition:any;
@Component({
  selector: 'app-navbar4',
  templateUrl: './navbar4.component.html',
  styleUrls: ['./navbar4.component.css']
})
export class Navbar4Component implements OnInit {
  event$:any;
  search:any;
  constructor(private _location: Location,private userService: UserService,
    private router: Router,public dialog: MatDialog,private ac : ActivatedRoute,
    public translate: TranslateService,public toster:ToastrService) {
    translate.addLangs(['hi', 'en']);
    translate.setDefaultLang('en');
    
  }
  cold_Storage(){
    this.router.navigate(['/cold-storage',this.cold])
  }
  ware_Storage(){
    this.router.navigate(['/ware-storage',this.ware])
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
  }

  @Output() send = new EventEmitter<any>();

  url:any;
  data?:any;
  appear=false;
  close=false;
  oldLocation:any;
  cold='627d4516c47afab2189efbce';
  ware='627d4527c47afab2189efbd0';

  message(){
    this.send.emit(this.data);
  }
  
  toggle(){
    this.appear=!this.appear;
  }
  openDialog(): void {
    this.dialog.open(ConfirmComponent);
  }
  dataCalled(){
    this.router.navigate(['/search',this.data])
    this.send.emit(this.data);
    console.log("navbar "+this.data)
    if(this.data)
    {
      this.router.navigate(['search',this.data]);
    }
    else{
      this.router.navigate(['']);
    }
  }

  storage(type:any){
    if(type=='cold'){
      this.router.navigate(['storage/'+this.cold])
    }else{
      this.router.navigate(['storage/'+this.ware])
    }
  }

  toggle2(){
    this.close=!this.close;
  }

  isLoggedIn():boolean{
    return this.userService.checkToken();
  }
  signOut(){
    if(confirm("Are you Sure ?")){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('name');
      this.router.navigate(['sign-in']);
    }
  }

  voice(){
    if("webkitSpeechRecognition" in window){
        
      let vSearch = new webkitSpeechRecognition();
      vSearch.lang = "en-US";
      // vSearch.lang ="hi-HI"
      vSearch.start();
  
      vSearch.onresult = async (e:any) =>{
        this.search = await e.results[0][0].transcript;
        console.log(this.search);
        this.router.navigate(['search',this.search]).then(()=>{
          location.reload();
        });
        vSearch.stop();        
      }
      vSearch.onerror = function(e:any){
        console.log(e);
        vSearch.stop();
      }
    }
    else{
      this.toster.warning('Not Avaliable');
      console.log("Your browser dosen't support speech recognition");
    }
   }
   onHome(){
    this.router.navigate(['']);
   }
}
