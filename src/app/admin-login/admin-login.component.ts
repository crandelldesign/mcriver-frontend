import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user/user.service';

@Component({
  selector: 'mc-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

  loggedInSub: Subscription;

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.loggedInSub = this.userService.loggedIn$.subscribe(
      loggedIn => {
        if (this.userService.user.loggedIn) {
          this.router.navigate(['/admin']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }

}
