import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { OrderLookupComponent } from './pages/order-lookup/order-lookup.component';
import { StyleGuideComponent } from './pages/style-guide/style-guide.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {path: '', component: HomeComponent},
      { path: 'sign-up', component: SignUpComponent },
      { path: 'place-order', component: PlaceOrderComponent },
      { path: 'thank-you/:friendlyOrderId', component: ThankYouComponent },
      { path: 'order-lookup', component: OrderLookupComponent },
      { path: 'style-guide', component: StyleGuideComponent },
      { path: '404', component: NotFoundComponent }/*,
      { path: '**', component: NotFoundComponent }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
