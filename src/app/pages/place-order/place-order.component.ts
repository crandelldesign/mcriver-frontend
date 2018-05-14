import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../product/item';
import { ProductService } from '../../product/product.service';
import { UserService } from '../../user/user.service';

import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { Order } from '../../order/order';

@Component({
  selector: 'mc-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  order = new Order();
  items: Item[];
  isPanel1Open = false;
  isPanel2Open = false;
  isPanel3Open = false;
  isPanel4Open = false;
  @ViewChild('collapse1') collapse1: CollapseDirective;
  @ViewChild('collapse2') collapse2: CollapseDirective;
  @ViewChild('collapse3') collapse3: CollapseDirective;
  @ViewChild('collapse4') collapse4: CollapseDirective;
  collapseFirstLoad = false;

  loggedInSub: Subscription;

  constructor(
    public productsService: ProductService,
    private userService: UserService
  ) { 
    this.productsService.people = [];
  }

  ngOnInit() {
    //
    this.productsService.fetchCart();
    this.productsService.cartItems.forEach((itemObject) =>{
      let item = itemObject['item'];
      if (item.slug == 'camping-people-in-group') {
        for (let index = 0; index < item.quantity; index++) {
          this.productsService.people.push({
            name: 'Person #' + (index + 1),
            is_rookie: false,
            price: item.price
          });
        }
      }
    });
    this.loggedInSub = this.userService.loggedIn$.subscribe(
      loggedIn => {
        if (this.userService.user.loggedIn) {
          //this.isPanel1Open = false;
          //this.isPanel2Open = true;
          this.collapse2.show();
          if (this.productsService.people[0]!=undefined) {
            this.productsService.people[0].name = this.userService.user.name;
          }
          this.order.email = this.userService.user.email;
        }
      }
    );
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }

  onAccordionChange(number,event) {
    // Runs through all numbers on first load
    console.log(number);
    (number != 1)?this.collapse1.hide():'';
    (number != 2)?this.collapse2.hide():'';
    (number != 3)?this.collapse3.hide():'';
    (number != 4)?this.collapse4.hide():'';
    if (!this.collapseFirstLoad && number == 4) {
      this.collapseFirstLoad = true;
      this.collapse1.show();
    }
  }

}
