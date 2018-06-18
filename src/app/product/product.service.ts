import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import { Category } from './category';

@Injectable()
export class ProductService {

  categories: Category[];
  cartTotal: number = 0;
  cartItems: any[] = [];
  agreement: boolean = false;
  people: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable <Category[]> {
    let url = environment.api + '/categories';
    return this.http.get<Category[]>(url)
      .catch((error: Response | any) => {
        return Observable.throw('User not logged in');
    });
  }

  public fetchCategories() {
    this.getCategories().subscribe(data => {
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

  public fetchCart() {
    if (localStorage.getItem('cartItems') != null) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
      this.updateCartTotal();
      return this.cartItems;
    }
  }

  public updateCartTotal() {
    let total = 0;
    this.cartItems.map(_item => {
      total += (_item.item.price * _item.item.quantity);
    });
    this.cartTotal = total;
  }

}
