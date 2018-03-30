import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user/user.interceptor';
import { BsDropdownModule, CollapseModule, TabsModule } from 'ngx-bootstrap';
import { NavComponent } from './layouts/nav/nav.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductService } from './product/product.service';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    NavComponent,
    SignUpComponent,
    PlaceOrderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'sign-up', component: SignUpComponent },
      { path: 'place-order', component: PlaceOrderComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TransferHttpCacheModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    UserService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
