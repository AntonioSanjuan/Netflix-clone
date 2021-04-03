import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IGenericError } from 'src/app/models/common/errors/genericError.model';
import {  } from 'src/app/models/common/response/notification/notification.model';
import { ILoginResponse, ILoginResponseContent } from 'src/app/models/user-models/Login/LoginResponse.model';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: IGenericError;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.createLoginForm();
   }

  ngOnInit() {}

  public async login() {
    const loginForm = this.form.value;
    await this.authService.login(loginForm.username, loginForm.password)
    .then((loginResponse) => {
      if (this.authService.getIsAuthenticated()) {
        this.router.navigate(['home']);
      }
      this.setLoginResponseError(loginResponse);
    }).catch((error: IGenericError) => {
      this.setHttpResponseError(error);
    });
  }

  public validateForm() {
    if (this.form.valid) {
      this.login();
    }
  }

  private createLoginForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }


  private setLoginResponseError(loginResponse?: ILoginResponse) {
    this.error = (loginResponse?.notification?.error) ? {...loginResponse?.notification?.error} : undefined;
  }

  private setHttpResponseError(httpError: IGenericError) {
    this.error = {...httpError};
  }
}
