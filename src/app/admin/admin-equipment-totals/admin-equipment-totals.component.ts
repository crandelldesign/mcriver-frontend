import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { OrderService } from '../../order/order.service';
import { Category } from '../../product/category';
import { count } from 'rxjs/operators';

@Component({
  selector: 'mc-admin-equipment-totals',
  templateUrl: './admin-equipment-totals.component.html',
  styleUrls: ['./admin-equipment-totals.component.scss']
})
export class AdminEquipmentTotalsComponent implements OnInit {

  currentYear: number = (new Date()).getFullYear();
  categories: Category[] = [];

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  customClasses = {
    sortAscending: 'fa fa-sort-asc',
    sortDescending: 'fa fa-sort-desc',
    pagerLeftArrow: 'fa fa-angle-left',
    pagerRightArrow: 'fa fa-angle-right',
    pagerPrevious: 'fa fa-step-backward',
    pagerNext: 'fa fa-step-forward'
  };

  constructor(
    public productService: ProductService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.productService.getCategories(true).subscribe(categories => {
      //console.log(categories);
      //this.categories = data;
      this.orderService.getOrders(this.currentYear, true).subscribe( orders => {
        //console.log(orders);
        this.categories = this.attachOrdersToItems(categories, orders);
        this.loadingIndicator = false;
      });
    });
  }

  attachOrdersToItems(categories, orders) {
    categories = categories.filter( category => category.name != 'Camping' );
    categories.forEach(category => {
      category['items'].forEach(item => {
        //console.log(item);
        let matchingOrders = orders.filter( order => {
          //console.log(order.items)
          return order.items.some(orderItem => orderItem.id === item.id);
        });
        //console.log(item.name + ': ' + matchingOrders.length);
        //console.log(matchingOrders);
        item.quantity = matchingOrders.length;
      });
    });
    return categories;
  }

}
