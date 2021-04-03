import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { routes } from 'src/app/routing.module';
import { HomeComponent } from '../home/home.component';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture;
  let router: Router;

  let authServiceStub;
  const loginMock = {} as ILoginResponse;
  let isAuthenticatedValueMock = false;

  beforeEach(() => {
    isAuthenticatedValueMock = false;

    authServiceStub = {
        login : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => loginMock) ),
        getIsAuthenticated : jest.fn(() => isAuthenticatedValueMock )
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, HomeComponent],
      imports: [
          RouterTestingModule.withRoutes(routes),
          ReactiveFormsModule,
          FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  fixture = TestBed.createComponent(LoginComponent);
  component = fixture.componentInstance;
  router = TestBed.inject(Router);

  fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login() should call AuthService.Login() function', () => {
    // spy
    const loginSpy = jest.spyOn(authServiceStub, 'login');

    component.login().then(() => {
      expect(loginSpy).toHaveBeenCalled();
    });

  });

  it('login() should call AuthService.getIsAuthenticated() function', () => {
    // spy
    const getIsAuthenticatedSpy = jest.spyOn(authServiceStub, 'getIsAuthenticated');

    component.login().then(() => {
      expect(getIsAuthenticatedSpy).toHaveBeenCalled();
    });

  });

  it('login() sucessfull should navigate', () => {
    // mock
    isAuthenticatedValueMock = true;

    const navigateSpy = spyOn(router, 'navigate');

    component.login().then(() => {
      expect(navigateSpy).toHaveBeenCalled();
    });

  });

  it('login() failure should NOT navigate', () => {
    // mock
    isAuthenticatedValueMock = false;

    const navigateSpy = spyOn(router, 'navigate');

    component.login().then(() => {
      expect(navigateSpy).not.toHaveBeenCalled();
    });

  });
});

