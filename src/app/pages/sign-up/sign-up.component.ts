import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/category';

@Component({
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  categories: Category[];

  constructor(
    public productsService: ProductService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

}
