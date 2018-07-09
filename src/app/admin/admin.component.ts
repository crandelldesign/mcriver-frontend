import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { navItems } from './admin-nav';

@Component({
  selector: 'mc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  public navItems = navItems;

  constructor() { }

  ngOnInit() {
  }

}
