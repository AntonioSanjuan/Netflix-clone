import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IResponseNotificationError } from 'src/app/models/common/response/notification/notification.model';
import { ILoginResponse, ILoginResponseContent } from 'src/app/models/user-models/Login/LoginResponse.model';
import { AuthService } from 'src/app/services/user/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: IResponseNotificationError;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  public async login() {
    const loginForm = this.form.value;
    await this.authService.login(loginForm.username, loginForm.password)
    .then((loginResponse) => {
      if (this.authService.getIsAuthenticated()) {
        this.router.navigate(['home']);
      }
      this.setNotificationResponse(loginResponse);
    });
  }

  private setNotificationResponse(loginResponse?: ILoginResponse) {
    this.error = (loginResponse?.notification?.error) ? {...loginResponse?.notification?.error} : undefined;
  }
}
