import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';
import { UtilService } from 'src/app/services/util/utils.service';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture;

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
      declarations: [NavBarComponent],
      imports: [],
      providers: [
        {provide: UtilService, useValue: authServiceStub},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  });

  fixture = TestBed.createComponent(NavBarComponent);
  component = fixture.componentInstance;

  fixture.detectChanges();
  });

  it('initially AuthService.getIsAuthenticated() should be FALSE', () => {
    // spy
    const actual = component.isAuthenticated;

    expect(actual).toBeFalse();
  });
});
