import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { UserService } from './user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user/user.interceptor';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
//import { NavComponent } from './layouts/nav/nav.component';
//import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductService } from './product/product.service';
//import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { RegisterFormComponent } from './user/register-form/register-form.component';
import { LogoutComponent } from './user/logout/logout.component';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { OrderService } from './order/order.service';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment';
//import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { SharedService } from './shared/shared.service';
//import { OrderLookupComponent } from './pages/order-lookup/order-lookup.component';
//import { StyleGuideComponent } from './pages/style-guide/style-guide.component';
//import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminGuard } from './user/admin.guard';
import { SharedModule } from './shared/shared.module';
import { FrontendModule } from './frontend/frontend.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NotFoundComponent } from './frontend/pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginFormComponent,
    //SignUpComponent,
    //PlaceOrderComponent,
    //RegisterFormComponent,
    LogoutComponent,
    //PaymentComponent,
    AdminLoginComponent,
    //ThankYouComponent,
    //OrderLookupComponent,
    //StyleGuideComponent,
    //NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'login',
        component: AdminLoginComponent
      },
      { 
        path: '',
        loadChildren: './frontend/frontend.module#FrontendModule',
        pathMatch: 'full'
      },
      { path: 'logout', component: LogoutComponent },
      { path: '**', component: NotFoundComponent }
      //{ path: '', component: HomeComponent, pathMatch: 'full'},
      /*{ path: 'sign-up', component: SignUpComponent },
      { path: 'place-order', component: PlaceOrderComponent },
      { path: 'thank-you/:friendlyOrderId', component: ThankYouComponent },
      { path: 'order-lookup', component: OrderLookupComponent },
      { path: 'style-guide', component: StyleGuideComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }*/
    ]),
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripeKey),
    FrontendModule,
    SharedModule
  ],
  providers: [
    UserService,
    ProductService,
    OrderService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    HttpErrorHandler,
    MessageService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
