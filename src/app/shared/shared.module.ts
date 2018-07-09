import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from '../user/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class SharedModule { }
