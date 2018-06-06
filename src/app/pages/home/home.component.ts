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
        console.log('hi');
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

  onToken(token: string) {
    console.log(token);
  }

}
