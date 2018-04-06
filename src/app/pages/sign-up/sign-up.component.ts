import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/category';
import { Item } from '../../product/item';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  categories: Category[];
  cartTotal: number = 0;
  cartItems: any[] = [];
  validationErrors: Array<string> = [];


  constructor(
    public productsService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsService.fetchCategories();
    /*this.myForm = this._fb.group({
      items: this._fb.array([])
    });*/
  }

  /*updateTotal(direction,item) {
    if (direction == 'increase') {
      item.quantity++;
      this.productsService.cartTotal = this.productsService.cartTotal + item.price;
    } else if (direction == 'decrease' && item.quantity != 0) {
      item.quantity--;
      this.productsService.cartTotal = this.productsService.cartTotal - item.price;
    }
    let exists = false
    //Search this product on the cart and increment the quantity
    this.cartItems = this.cartItems.map(_item => {
      if (_item.item.id == item.id) {
        //_item.item.quantity = item.quantity
        exists = true
      }
      return _item
    });
    if (!exists && direction == 'increase') {
      this.cartItems.push({
        item:item,
      });
    } else if (exists && item.quantity == 0) {
      this.cartItems.splice(this.cartItems.indexOf(item), 1);
    }
  }*/

  updateCart(quantity, item) {
    item.quantity = quantity;
    console.log(item.quantity);
    let exists = false
    this.productsService.cartItems = this.productsService.cartItems.map(_item => {
      if (_item.item.id == item.id) {
        exists = true
        _item.item.quantity = quantity;
      }
      return _item
    });
    if (!exists && quantity > 0) {
      this.productsService.cartItems.push({
        item:item,
      });
    } else if (exists && item.quantity == 0) {
      this.productsService.cartItems.splice(this.productsService.cartItems.indexOf(item), 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.productsService.cartItems));
    this.productsService.updateCartTotal();
  }

  submitOrder() {
    // Validate
    this.validationErrors = [];
    if (this.productsService.cartItems.length == 0) {
      this.validationErrors.push('Please add items to your order.');
    }
    if (!this.productsService.agreement) {
      this.validationErrors.push('Please check the checkbox to agree.');
    }

    // If validates successfully
    if (this.validationErrors.length == 0) {
      this.router.navigate(['place-order']);
    }
  }

}
