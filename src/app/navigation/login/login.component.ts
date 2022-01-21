import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {getFormValidationErrors} from "../../commons/utils/get-form-validation-errors";
import {SignInRequest} from "../../commons/utils/requests";
import {LoginService} from "../services/login.service";
import {LocalStorageService} from "../services/local-storage.service";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder, private service: LoginService, private lservice: LocalStorageService, private router: Router) {}

  onSubmit(): void {
    let message = getFormValidationErrors(this.loginForm, 'logowania')
    if (message != null) {
      alert(message);
    } else {
      let signInRequest = new SignInRequest(this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value)
      this.service.loginUser(signInRequest).subscribe(
        response => {
          this.lservice.set('token', (response.accessToken));
          this.lservice.set('id', (response.id).toString());
          this.lservice.set('role', (response.roles[0]));
          if(response.roles[0] == 'ADMIN') {
            this.router.navigate(['/admin/users']);
          } else {
            this.router.navigate(['/dashboard/wall']);
          }
        },
        _ => alert('Nieprawidłowy login i/lub hasło')
      )
    }
  }
}
