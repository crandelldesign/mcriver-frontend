import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { navItems } from './admin-nav';

@Component({
  selector: 'mc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, AfterViewInit {

  sidebarToggler: any;
  public navItems = navItems;

  constructor(
    private route: ActivatedRoute
  ) {
    //console.log(this.route);
    let segments: UrlSegment[] = this.route.snapshot.url;
    //console.log(segments);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let navbarBrand = document.getElementsByClassName('navbar-brand')[0];
    navbarBrand['href'] = '/admin';
  }

}
