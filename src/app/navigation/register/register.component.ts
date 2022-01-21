import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {getFormValidationErrors} from "../../commons/utils/get-form-validation-errors";
import {SignUpRequest} from "../../commons/utils/requests";
import {RegistrationService} from "../services/registration.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    firstName: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private service: RegistrationService) {}

  onSubmit(): void {
    let message = getFormValidationErrors(this.registerForm, 'rejestracji')
    if (message != null) {
      alert(message);
    } else {
      let signUpRequest = new SignUpRequest(
        this.registerForm.controls['firstName'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value)
      this.service.registerUser(signUpRequest)
    }
  }
}
