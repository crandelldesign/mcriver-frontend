import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../product/item';
import { ProductService } from '../../product/product.service';
import { UserService } from '../../user/user.service';

import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { Order } from '../../order/order';
import { OrderService } from '../../order/order.service';

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
  isPanel1Disabled: boolean = false;
  isPanel2Disabled: boolean = true;
  isPanel3Disabled: boolean = true;
  isPanel4Disabled: boolean = true;
  @ViewChild('collapse1') collapse1: CollapseDirective;
  @ViewChild('collapse2') collapse2: CollapseDirective;
  @ViewChild('collapse3') collapse3: CollapseDirective;
  @ViewChild('collapse4') collapse4: CollapseDirective;
  panel2Message = {
    type: 'success',
    message: ``
  };
  panel3Message = {
    type: 'success',
    message: ``
  };
  collapseFirstLoad = false;
  paymentLoading: boolean = false;

  loggedInSub: Subscription;

  constructor(
    public productsService: ProductService,
    private orderService: OrderService,
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
            isRookie: false,
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
          this.isPanel2Disabled = false;
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
    (number != 1)?this.collapse1.hide():'';
    (number != 2)?this.collapse2.hide():'';
    (number != 3)?this.collapse3.hide():'';
    (number != 4)?this.collapse4.hide():'';
    if (!this.collapseFirstLoad && number == 4) {
      this.collapseFirstLoad = true;
      this.collapse1.show();
    }
  }

  continueAsGuest() {
    this.isPanel2Disabled = false;
    this.collapse2.toggle();
  }

  submitPanel2() {
    let validated = true;
    this.productsService.people.forEach( (person, index) => {
      if (!person.name || person.name == 'Person #' + (index + 1)) {
        validated = false;
      }
    });
    if (validated) {
      console.log(this.productsService.people);
      this.panel2Message.message = '';
      this.isPanel3Disabled = false;
      this.collapse3.toggle();
    } else {
      this.panel2Message.type = 'danger';
      this.panel2Message.message = 'Please fill out all of the names.';
    }
  }

  submitPanel3() {
    let validated = true;
    if (!this.order.email) {
      validated = false;
    }
    if (!this.order.phone) {
      validated = false;
    }
    console.log(this.order.phone);
    if (validated) {
      this.isPanel4Disabled = false;
      this.collapse4.toggle();
    } else {
      this.panel3Message.type = 'danger';
      this.panel3Message.message = 'Please enter both the contact email and phone number.';
    }
  }

  onToken(token: string) {
    this.paymentLoading = true;
    console.log(token);
    //console.log(this.order);
    //console.log(this.productsService.cartItems);
    //console.log(this.productsService.people);
    //console.log(this.userService.user.id);
    this.order.paymentMethod = 'credit card';
    this.order.total = this.productsService.cartTotal;
    this.order.items = this.productsService.cartItems;
    this.order.persons = this.productsService.people;
    this.order.user = this.userService.user;
    console.log(this.order);
    
    this.orderService.sendOrder(this.order, token).subscribe( data => {
      console.log(data);
      this.paymentLoading = false;
    });
    
  }

}
