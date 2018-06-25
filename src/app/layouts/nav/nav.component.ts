import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;

  constructor(
    public userService: UserService,
    public router: Router
  ) { 
    this.userService.checkLoggedIn();
  }

  ngOnInit() {
  }

}
