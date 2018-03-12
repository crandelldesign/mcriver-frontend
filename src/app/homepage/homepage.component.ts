import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user/user.service';

@Component({
  selector: 'mc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

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
