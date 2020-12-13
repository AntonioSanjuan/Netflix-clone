import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CookieModule } from 'src/app/modules/cookieModule';
import { ILoginRequest, LoginRequest } from 'src/app/models/user-models/Login/LoginRequest.model';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';
import { UserServicesNames } from 'src/app/models/user-models/serviceNames.model';
import { UtilService } from '../util/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:1212/';

  private userServicesNames: UserServicesNames;
  private cookieModule: CookieModule;
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private utilService: UtilService) {
      this.cookieModule = new CookieModule();
      this.userServicesNames = new UserServicesNames(this.baseUrl);
  }

  async checkAuthenticated() {
    const authenticated = this.cookieModule.getToken();

    this.isAuthenticated.next( (authenticated) ? true : false);
    return authenticated;
  }

  async login(username: string, password: string) {
    const loginRequestUrl: string = this.userServicesNames.getLoginUrl();
    const loginRequestContent: ILoginRequest = new LoginRequest(username, password);

    this.http.post<ILoginResponse>(loginRequestUrl, { loginRequestContent }).subscribe(loginResponse => {
      if(this.utilService.validator.responseValidator.isLoginResponseValid(loginResponse)){
          var responseContent = {...loginResponse.content}
          this.cookieModule.setToken(responseContent.accessToken);
          this.isAuthenticated.next(true);
          this.router.navigate(['home']);
      }

    });
  }



  async logout() {
    this.cookieModule.clearTokens();
    this.isAuthenticated.next(false);
    this.router.navigate(['']);
  }

}