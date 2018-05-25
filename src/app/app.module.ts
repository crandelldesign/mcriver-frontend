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
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NavComponent } from './layouts/nav/nav.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductService } from './product/product.service';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { RegisterFormComponent } from './user/register-form/register-form.component';
import { LogoutComponent } from './user/logout/logout.component';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    NavComponent,
    SignUpComponent,
    PlaceOrderComponent,
    RegisterFormComponent,
    LogoutComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'sign-up', component: SignUpComponent },
      { path: 'place-order', component: PlaceOrderComponent },
      { path: 'logout', component: LogoutComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TransferHttpCacheModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripeKey)
  ],
  providers: [
    UserService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
