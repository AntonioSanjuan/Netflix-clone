import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { routes } from 'src/app/routing.module';
import { HomeComponent } from '../home/home.component';
import { AuthService } from 'src/app/services/user/Auth/auth.service';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';

describe('NavBarComponent', () => {
  let component: LoginComponent;
  let fixture;
  let router: Router;

  let authServiceStub;
  let loginMock = {} as Promise<ILoginResponse>;
  let isAuthenticatedMock: boolean;

  beforeEach(() => {
    authServiceStub = {
        login : jest.fn(() => loginMock),
        logout : jest.fn(() => null),
        isAuthenticated: jest.fn(() => isAuthenticatedMock)
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


  it('initialy uuser&pass form is empty, ', () => {
    const user = component.form.value.username;
    const pass = component.form.value.password;

    expect(user).toEqual('');
    expect(pass).toEqual('');

  });
});

