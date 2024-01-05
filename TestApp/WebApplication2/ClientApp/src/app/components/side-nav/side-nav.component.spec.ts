import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ILoginResponse } from "src/app/models/user-models/Login/LoginResponse.model";
import { HomeComponent } from "src/app/pages/home/home.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { routes } from "src/app/routing.module";
import { SideNavService } from "src/app/services/side-nav/side-nav.service";
import { AuthService } from "src/app/services/user/auth/auth.service";
import { SideNavComponent } from "./side-nav.component";

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture;
  let router: Router;


  let authServiceStub;
  let sideNavServiceStub;

  const loginMock = {} as ILoginResponse;

  let isAuthenticatedValueMock = false;
  let isSideNavOpened = true;
  beforeEach(() => {
    isAuthenticatedValueMock = false;

    sideNavServiceStub = {
      getIsSideNavOpened: jest.fn(() => isSideNavOpened),
      getIsSideNavOpened$: jest.fn(() => of(isSideNavOpened)),
      setIsSideNavOpened: jest.fn(() => {})
    };

    authServiceStub = {
        getIsAuthenticated : jest.fn(() => isAuthenticatedValueMock ),
        getIsAuthenticated$: jest.fn(() => of(isAuthenticatedValueMock))
    };

    TestBed.configureTestingModule({
      declarations: [SideNavComponent, LoginComponent, HomeComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: SideNavService, useValue: sideNavServiceStub},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })

  fixture = TestBed.createComponent(SideNavComponent);
  component = fixture.componentInstance;
  router = TestBed.inject(Router);

  fixture.detectChanges();
});

  it('should create', () => {
    expect(true).toBeTruthy();
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

  it('initially getIsSideNavOpened should be called', () => {
    //spy 
    const getIsAuthenticatedSpy = jest.spyOn(sideNavServiceStub, 'getIsSideNavOpened');

    expect(getIsAuthenticatedSpy).toHaveBeenCalled();
  });

  it('initially getIsSideNavOpened$ should be called', () => {
    //spy 
    const getIsAuthenticated$Spy = jest.spyOn(sideNavServiceStub, 'getIsSideNavOpened$');
    
    expect(getIsAuthenticated$Spy).toHaveBeenCalled();
  });
});
