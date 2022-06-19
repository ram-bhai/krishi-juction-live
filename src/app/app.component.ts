import { Component ,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Krishi Junction';
  searchData:any;

  searchSend($event: any) {
    console.log("app.component "+$event)
    this.searchData = $event;
  }
  constructor(public translate: TranslateService,private activatedRouter : ActivatedRoute) {
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('en');
    
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

}

