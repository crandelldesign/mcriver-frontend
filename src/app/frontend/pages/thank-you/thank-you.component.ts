import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../order/order';
import { OrderService } from '../../../order/order.service';
import {  } from 'print-js';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'mc-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  order = new Order();

  constructor(
    public orderService: OrderService,
    public sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.order.friendly_order_id = params['friendlyOrderId'];
      this.fetchOrder(this.order);
   });
  }

  ngOnInit() {
  }

  fetchOrder(order) {
    this.orderService.getOrder(order.friendly_order_id).subscribe( data => {
      this.order = data;
      this.order.items.forEach( (item, index) => {
        if (item['slug'] == 'camping-people-in-group') {
          this.order.persons[index].price = item.price;
        }
      });
    });
  }

}
