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
  agreement: boolean = false;
  validationErrors: Array<string> = [];


  constructor(
    public productsService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchCategories();
    /*this.myForm = this._fb.group({
      items: this._fb.array([])
    });*/
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe(data => {
      if (localStorage.getItem('cartItems') != null) {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
        
      }
      this.categories = data;

      for (let x = 0; x < this.categories.length; x++) {

        for (let y = 0; y < this.categories[x].items.length; y++) {
          
          if (this.categories[x].items[y].children.length == 0) {
            this.categories[x].items[y].quantity = 0;
            this.cartItems = this.cartItems.map(_item => {
              if (_item.item.id == this.categories[x].items[y].id) {
                this.categories[x].items[y].quantity = _item.item.quantity;
              }
              return _item
            });
          } else {
            for (let z = 0; z < this.categories[x].items[y].children.length; z++) {
              this.categories[x].items[y].children[z].quantity = 0;
              this.cartItems = this.cartItems.map(_item => {
                if (_item.item.id == this.categories[x].items[y].children[z].id) {
                  this.categories[x].items[y].children[z].quantity = _item.item.quantity;
                }
                return _item
              });
            }
          }
        }
      }

      this.updateCartTotal();
    });
  }

  updateTotal(direction,item) {
    if (direction == 'increase') {
      item.quantity++;
      this.cartTotal = this.cartTotal + item.price;
    } else if (direction == 'decrease' && item.quantity != 0) {
      item.quantity--;
      this.cartTotal = this.cartTotal - item.price;
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
  }

  updateCart(quantity, item) {
    item.quantity = quantity;
    let exists = false
    this.cartItems = this.cartItems.map(_item => {
      if (_item.item.id == item.id) {
        exists = true
      }
      return _item
    });
    if (!exists && quantity > 0) {
      this.cartItems.push({
        item:item,
      });
    } else if (exists && item.quantity == 0) {
      this.cartItems.splice(this.cartItems.indexOf(item), 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCartTotal();
  }

  updateCartTotal() {
    console.log(this.cartItems);
    let total = 0
    this.cartItems.map(_item => {
      console.log(_item.item.price);
      total += (_item.item.price * _item.item.quantity);
    });
    this.cartTotal = total;
  }

  submitOrder() {
    // Validate
    this.validationErrors = [];
    if (this.cartItems.length == 0) {
      this.validationErrors.push('Please add items to your order.');
    }
    if (!this.agreement) {
      this.validationErrors.push('Please check the checkbox to agree.');
    }

    // If validates successfully
    if (this.validationErrors.length == 0) {
      this.router.navigate(['place-order']);
    }
  }

}
