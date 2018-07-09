import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../order/order.service';

class DateOnlyPipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'MM/dd/y');
  }
}

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

  columns = [
    { prop: 'name' },
    { name: 'People in Group', prop: 'person_count' },
    { name: 'Email' },
    { name: 'Phone' },
    { name: 'Registered', prop: 'created_at', pipe: new DateOnlyPipe('en-US') },
  ];

  constructor(
    public orderService: OrderService
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

}
