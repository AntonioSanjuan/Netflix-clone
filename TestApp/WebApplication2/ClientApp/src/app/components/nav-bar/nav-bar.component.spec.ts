import { routes } from 'src/app/routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';
import { UtilService } from 'src/app/services/util/utils.service';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/pages/home/home.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
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
      declarations: [NavBarComponent, LoginComponent, HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      providers: [
        {provide: UtilService, useValue: authServiceStub},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  fixture = TestBed.createComponent(NavBarComponent);
  component = fixture.componentInstance;
  router = TestBed.inject(Router);

  fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initially AuthService.getIsAuthenticated() should be FALSE', () => {
    // spy
    const actual = component.isAuthenticated;

    expect(actual).toEqual(false);
  });

  it('goToLoginPage() should redirect to login page', () => {
    // spy
    const navigateSpy = spyOn(router, 'navigate');
    component.goToLoginPage();

    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('goTopHomePage() should redirect to home page', () => {
    // spy
    const navigateSpy = spyOn(router, 'navigate');
    component.goToHomePage();

    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });
});
