import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'mc-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  // Disable Buttons while Loading
  loading: boolean = false;
  // Handle errors
  registerFormErrors = [];
  registerFormServerErrors: string = '';

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.register().subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data['success']) {
          this.userService.processLogin(data);
        } else {
          this.registerFormErrors = data.error;
        }
      },
      error => {
        console.log(error);
        this.loading = false;
        this.registerFormServerErrors = 'An error occured trying to submit this form.';
      }
    );
}

}
