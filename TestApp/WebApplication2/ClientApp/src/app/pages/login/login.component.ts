import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResponseNotificationError } from 'src/app/models/common/response/notification/notification.model';
import { AuthService } from 'src/app/services/user/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: IResponseNotificationError;

  public loginInvalid: boolean;

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

  login() {
    const loginForm: any = this.form.value;
    this.authService.login(loginForm.username, loginForm.password)
    .then((loginResponse) => {
      if (this.authService.isAuthenticated) {
        this.router.navigate(['home']);
      }
      this.setError(loginResponse.notification.error);
    });
  }

  private setError(error?: IResponseNotificationError) {
    if (error) {
      this.error = {...error};
    } else {
      this.error = {} as IResponseNotificationError;
    }
  }
}
