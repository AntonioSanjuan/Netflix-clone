import { routes } from 'src/app/routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SideNavService } from 'src/app/services/side-nav/side-nav.service';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { of } from 'rxjs';
import { DeviceService } from 'src/app/services/user/device/device.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture;
  let router: Router;

  let authServiceStub;
  let sideNavServiceStub;
  let deviceServiceStub;

  let isAuthenticatedValueMock = false;
  let screenSizeTypeValueMock = undefined;
  
  beforeEach(() => {
    deviceServiceStub = {
      getScreenSizeType: jest.fn(() => screenSizeTypeValueMock )
    }
    sideNavServiceStub = {
      switchIsSideNavOpened: jest.fn(() => {})
    };

    authServiceStub = {
      getIsAuthenticated : jest.fn(() => isAuthenticatedValueMock ),
      getIsAuthenticated$: jest.fn(() => of(isAuthenticatedValueMock))
  };
    
    TestBed.configureTestingModule({
      declarations: [NavBarComponent, LoginComponent, HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: SideNavService, useValue: sideNavServiceStub},
        {provide: DeviceService, useValue: deviceServiceStub}
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

  it('initially getIsAuthenticated should be called', () => {
    //spy 
    const getIsAuthenticatedSpy = jest.spyOn(authServiceStub, 'getIsAuthenticated');

    expect(getIsAuthenticatedSpy).toHaveBeenCalled();
  });

  it('initially getIsAuthenticated$ should be called', () => {
    //spy 
    const getIsAuthenticated$Spy = jest.spyOn(authServiceStub, 'getIsAuthenticated$');
    
    expect(getIsAuthenticated$Spy).toHaveBeenCalled();
  });
});
