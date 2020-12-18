import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ILoginRequest, LoginRequest } from 'src/app/models/user-models/Login/LoginRequest.model';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';
import { UserServicesNames } from 'src/app/models/user-models/serviceNames.model';
import { UtilService } from '../../util/utils.service';
import { TokenModule } from 'src/app/modules/tokenModule/tokenModule';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // appSettings service (?)
  private baseUrl = 'http://localhost:1212/';

  private userServicesNames: UserServicesNames;
  private tokenModule: TokenModule;

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private utilService: UtilService) {
      this.tokenModule = new TokenModule();
      this.userServicesNames = new UserServicesNames(this.baseUrl);
  }

  private processLoginResponse(loginResponse: ILoginResponse): ILoginResponse | undefined {
      if (this.utilService.validator.responseValidator.isLoginResponseValid(loginResponse)) {
        const responseContent = {...loginResponse.content};
        this.tokenModule.setToken(responseContent.accessToken);
        this.isAuthenticated.next(true);
      } else {
        this.isAuthenticated.next(false);
      }
      return loginResponse;
  }

  public async login(username: string, password: string): Promise<ILoginResponse> {
    const loginRequestUrl: string = this.userServicesNames.getLoginUrl();
    const loginRequestContent: ILoginRequest = new LoginRequest(username, password);

    return await this.http.post<ILoginResponse>(loginRequestUrl, loginRequestContent).pipe(
      map(response =>  this.processLoginResponse(response))
    ).toPromise();
  }

  public logout() {
    this.tokenModule.clearTokens();
    this.isAuthenticated.next(false);
  }
}
