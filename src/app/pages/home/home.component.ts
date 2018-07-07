import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedInSub: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loggedInSub = this.userService.loggedIn$.subscribe(
      loggedIn => {
        if (this.userService.user.loggedIn) {
          this.someOtherFunction();
        }
      }
    )
    this.userService.checkLoggedIn()
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }

  someOtherFunction() {
    console.log(this.userService.user.name);
  }

  refresh() {
    this.userService.getRefreshToken();
  }

}
