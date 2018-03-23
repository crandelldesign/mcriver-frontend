import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/category';
import { Item } from '../../product/item';

@Component({
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public myForm: FormGroup;
  categories: Category[];
  cartTotal: number = 0;
  cartItems: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public productsService: ProductService
  ) { }

  ngOnInit() {
    this.fetchCategories();
    /*this.myForm = this._fb.group({
      items: this._fb.array([])
    });*/
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe(data => {
      console.log(this.categories);
      this.categories = data;
      /*this.myForm = this._fb.group({
        categories: this._fb.array(this.categories)
      });*/
      for (let x = 0; x < this.categories.length; x++) {

        for (let y = 0; y < this.categories[x].items.length; y++) {
          
          if (this.categories[x].items[y].children.length == 0) {
            this.categories[x].items[y].quantity = 0;
          } else {
            for (let z = 0; z < this.categories[x].items[y].children.length; z++) {
              this.categories[x].items[y].children[z].quantity = 0;
            }
          }
        }
      }
      
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

}
