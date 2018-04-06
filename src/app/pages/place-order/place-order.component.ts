import { Component, OnInit } from '@angular/core';
import { Item } from '../../product/item';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'mc-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  items: Item[];

  constructor(
    public productsService: ProductService
  ) { 
    
  }

  ngOnInit() {
    //this.productsService.fetchCategories();
    this.productsService.fetchCart();
    console.log(this.productsService.cartItems);
    this.productsService.cartItems.forEach((itemObject) =>{
      let item = itemObject['item'];
      console.log(item)
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
  }

}
