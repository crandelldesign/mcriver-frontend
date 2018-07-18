import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderService } from '../../order/order.service';
import { Order } from '../../order/order';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'mc-admin-sign-ups',
  templateUrl: './admin-sign-ups.component.html',
  styleUrls: ['./admin-sign-ups.component.scss']
})
export class AdminSignUpsComponent implements OnInit {

  currentYear: number = (new Date()).getFullYear();

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  order: Order = new Order();

  @ViewChild('orderDetailsModal') orderDetailsModal: ModalDirective;

  constructor(
    public orderService: OrderService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.fetchSignUps();
  }

  fetchSignUps() {
    this.orderService.getOrders(this.currentYear, true).subscribe( orders => {
      /*orders.forEach( order => {
        order.
      });*/
      this.rows = orders;
      this.loadingIndicator = false;
      console.log(orders);
    });
  }

  openOrderModal(order, event) {
    event.preventDefault();
    this.order = order;
    this.orderDetailsModal.show();
  }

}
