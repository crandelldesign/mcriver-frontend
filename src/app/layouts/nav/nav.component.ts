import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'mc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;

  constructor(
    public router: Router,
    public userService: UserService
  ) {
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.isCollapsed = true;
      }
    });
  }

  ngOnInit() {
  }

}
