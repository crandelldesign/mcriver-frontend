import { Component, OnInit } from '@angular/core';
import { Order } from '../../../order/order';
import { OrderService } from '../../../order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mc-order-lookup',
  templateUrl: './order-lookup.component.html',
  styleUrls: ['./order-lookup.component.scss']
})
export class OrderLookupComponent implements OnInit {

  order = new Order();
  loading: boolean = false;
  // Handle errors
  orderLookupError: string = '';

  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.order.friendly_order_id = params['order'];
      if (this.order.friendly_order_id)
        this.searchOrder();
    });
  }

  ngOnInit() {
  }

  searchOrder() {
    if (this.order.friendly_order_id) {
      this.loading = true;
      this.orderService.getOrder(this.order.friendly_order_id).subscribe( data => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          // Not Found
          this.orderLookupError = 'The order number you entered could not be found. Please try another number.'
        } else {
          // Found
          this.order = data;
          /*this.order.items.forEach( (item, index) => {
            if (item['slug'] == 'camping-people-in-group') {
              this.order.persons[index].price = item.price;
            }
          });*/
          this.orderLookupError = '';
        }
        this.loading = false;
      });
    }
  }

}
