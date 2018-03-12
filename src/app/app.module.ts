import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserService } from './user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user/user.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomepageComponent, pathMatch: 'full'}
    ]),
    FormsModule,
    HttpClientModule,
    TransferHttpCacheModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
