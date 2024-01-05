import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ILoginRequest as ILoginRequestDto, LoginRequest } from 'src/app/models/user-models/Login/LoginRequest.model';
import { ILoginResponse as ILoginResponseDto } from 'src/app/models/user-models/Login/LoginResponse.model';
import { UtilService } from '../../util/utils.service';
import { TokenModule } from 'src/app/modules/tokenModule/tokenModule';
import { UserServicesNames } from 'src/app/modules/serviceNameModule/userServiceNameModule/userServiceNameModule';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // appSettings service (?)
  private baseUrl = 'https://localhost:44339/';

  private userServicesNames: UserServicesNames;
  private tokenModule: TokenModule;

  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private utilService: UtilService) {
      this.tokenModule = new TokenModule();
      this.userServicesNames = new UserServicesNames(this.baseUrl);
  }


  private setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.isAuthenticated$.next(this.isAuthenticated);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getIsAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  private processLoginResponse(loginResponse: ILoginResponseDto): ILoginResponseDto | undefined {
      if (this.utilService.validator.responseValidator.isLoginResponseValid(loginResponse)) {
        const responseContent = {...loginResponse.content};
        this.tokenModule.setToken(responseContent.accessToken);
        this.setIsAuthenticated(true);
      } else {
        this.setIsAuthenticated(false);
      }
      return loginResponse;
  }

  public async login(username: string, password: string) {
    const loginRequestUrl: string = this.userServicesNames.getLoginUrl();
    const loginRequestContent: ILoginRequestDto = new LoginRequest(username, password);

    return await this.http.post<ILoginResponseDto>(loginRequestUrl, loginRequestContent).pipe(
      map(response =>  this.processLoginResponse(response))
    ).toPromise();
  }

  public logout() {
    this.tokenModule.clearTokens();
    this.setIsAuthenticated(false);
  }
}
