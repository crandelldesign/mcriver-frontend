import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'mc-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  // Disable Buttons while Loading
  loading: boolean = false;
  // Handle errors
  loginFormErrors = [];

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.userService.login().subscribe(
      data => {
        this.loading = false;
        if (data['success']) {
          this.userService.processLogin(data);
        } else {
          this.loginFormErrors = data.error;
        }
      },
      error => {
        console.log(error.error.error);
        this.loading = false;
        this.loginFormErrors = error.error.error;
      }
    );
  }

}
