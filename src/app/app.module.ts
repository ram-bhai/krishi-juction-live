import { NgModule } from '@angular/core';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SigninComponent } from './signin/signin.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { ContractFarmingComponent } from './contract-farming/contract-farming.component';
import { UserService } from './service/user.service';
import { EquipmentsComponent } from './equipments/equipments.component';
import { Navbar3Component } from './navbar3/navbar3.component';
import { EquipementsDetailsComponent } from './equipements-details/equipements-details.component';
import { Registration2Component } from './registration2/registration2.component';
import { StorageComponent } from './storage/storage.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { Navbar4Component } from './navbar4/navbar4.component';
import { Service2Component } from './service2/service2.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenService } from './token.service';
import { FooterComponent } from './footer/footer.component';
import { AbouUsComponent } from './abou-us/abou-us.component';
import { ErrorhandlingComponent } from './errorhandling/errorhandling.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import {MatTableModule} from '@angular/material/table';
import { HistoryComponent } from './history/history.component';
import {MatRadioModule} from '@angular/material/radio';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';

import { ConfirmComponent } from './confirm/confirm.component';
import {MatSelectModule} from '@angular/material/select';
import { StorageFormComponent } from './storage-form/storage-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyStorageComponent } from './my-storage/my-storage.component';
import { ProfileComponent } from './profile/profile.component';
import { ScratchComponent } from './scratch/scratch.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


import { StDetailsComponent } from './st-details/st-details.component';
import { CommentComponent } from './comment/comment.component';
import { StorageCommentComponent } from './storage-comment/storage-comment.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

import { FavoriteComponent } from './favorite/favorite.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WareStorageComponent } from './ware-storage/ware-storage.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationPageComponent,
    SigninComponent,
    Navbar2Component,
    ContractFarmingComponent,
    EquipmentsComponent,
    Service2Component,
    Navbar3Component,
    EquipementsDetailsComponent,
    Registration2Component,
    StorageComponent,
    StorageDetailsComponent,
    Navbar4Component,
    FooterComponent,
    AbouUsComponent,
    ErrorhandlingComponent,

    ViewPageComponent,
    Homepage2Component,

    HistoryComponent,

      ServiceDialogComponent,

      ConfirmComponent,
        StorageFormComponent,
        MyStorageComponent,
        ProfileComponent,
        ScratchComponent,
        SearchComponent,
        StDetailsComponent,
        CommentComponent,
        StorageCommentComponent,
        HistoryDetailsComponent,
        TermsConditionComponent,
        FavoriteComponent,
        WareStorageComponent,
        


  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    SocialLoginModule,
    MatDialogModule,
    MatTableModule,
    CarouselModule ,
    MatRadioModule,
    MatSelectModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
,
    ToastrModule.forRoot()
  ],
  
  providers: [
  UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi:true
   },

  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '547163577773-7iqaf7gelrihr2a4kftjpilevu7mv3jq.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('clientId')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}