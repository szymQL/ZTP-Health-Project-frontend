import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {getFormValidationErrors} from "../../commons/utils/get-form-validation-errors";
import {SignInRequest} from "../../commons/utils/requests";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['user@gmail.com', [Validators.required, Validators.email]],
    password: ['root123', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: LoginService) {}

  onSubmit(): void {
    let message = getFormValidationErrors(this.loginForm, 'logowania')
    if (message != null) {
      alert(message);
    } else {
      let signInRequest = new SignInRequest(this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value)
      this.service.loginUser(signInRequest)
    }
  }
}
