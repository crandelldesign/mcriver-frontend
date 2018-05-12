import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../product/item';
import { ProductService } from '../../product/product.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'mc-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  items: Item[];
  isOpen = 1;

  loggedInSub: Subscription;

  constructor(
    public productsService: ProductService,
    private userService: UserService
  ) { 
    this.productsService.people = [];
  }

  ngOnInit() {
    //this.productsService.fetchCategories();
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
    console.log(this.productsService.people);
    this.loggedInSub = this.userService.loggedIn$.subscribe(
      loggedIn => {
        console.log('hi');
        if (this.userService.user.loggedIn) {
          this.isOpen = 2;
          if (this.productsService.people[0]!=undefined) {
            this.productsService.people[0].name = this.userService.user.name;
          }
        }
      }
    )
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }

}
