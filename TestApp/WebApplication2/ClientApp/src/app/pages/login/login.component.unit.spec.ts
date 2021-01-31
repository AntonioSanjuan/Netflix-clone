import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { routes } from 'src/app/routing.module';
import { HomeComponent } from '../home/home.component';
import { AuthService } from 'src/app/services/user/Auth/auth.service';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';

describe('LoginComponent', () => {
  // sucessfullLogin example
  const sucessfullLoginMockData = {
    schema: null,
    content: {
      accessToken: 'access-token',
      isValid: true
    },
    notification: {
      error: null
    }
  } as ILoginResponse;

  // failedLogin example
  const failedLoginMockData = {
    schema: null,
    content: {
      accessToken: '',
      isValid: false
    },
    notification: {
      error: {
        errorMessage: 'invalid login'
      }
    }
  } as ILoginResponse;


  let component: LoginComponent;
  let fixture;
  let router: Router;

  let authServiceStub;
  let loginMock = { } as ILoginResponse;

  beforeEach(() => {
    authServiceStub = {
        login : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => loginMock) ),
        logout : jest.fn(() => null),
        getIsAuthenticated : jest.fn(() => {})
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent, HomeComponent],
      imports: [
          RouterTestingModule.withRoutes(routes),
          ReactiveFormsModule
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

  it('initialy component user and password should BE empty, ', () => {
    const user = component.form.value.username;
    const pass = component.form.value.password;

    expect(user).toBeNull();
    expect(pass).toBeNull();
  });

  it('initialy component error should BE undefined, ', () => {
    expect(component.error).toBeUndefined();
  });

  it('login sucessfull should NOT generate error message  based on the loginResponse', () => {
    // mock
    const sucessfullLoginMock = {...sucessfullLoginMockData};
    loginMock = {...(sucessfullLoginMock)};

    component.login().then(() => {
      expect(component.error).toBeUndefined();
    });
  });

  it('login error should generate error message based on the loginResponse', () => {
    // mock
    const failedLoginMock = {...failedLoginMockData};
    loginMock = {...(failedLoginMock)};

    component.login().then(() => {
      expect(component.error).toBeDefined();
    });
  });
});

