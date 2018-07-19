import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from '../user/login-form/login-form.component';
import { RegisterFormComponent } from '../user/register-form/register-form.component';
import { PaymentComponent } from '../payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    PaymentComponent
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    PaymentComponent
  ]
})
export class SharedModule { }
