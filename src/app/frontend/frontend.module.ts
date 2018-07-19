import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxStripeModule } from 'ngx-stripe';
import { SharedModule } from '../shared/shared.module';
import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrderLookupComponent } from './pages/order-lookup/order-lookup.component';
import { StyleGuideComponent } from './pages/style-guide/style-guide.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FrontendRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripeKey),
    SharedModule,
    FormsModule
  ],
  declarations: [
    FrontendComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    PlaceOrderComponent,
    ThankYouComponent,
    OrderLookupComponent,
    StyleGuideComponent,
    NotFoundComponent

  ]
})
export class FrontendModule { }
