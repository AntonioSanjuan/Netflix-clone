import { fakeAsync, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { UtilService } from '../../util/utils.service';
import { Validator } from '../../util/modules/validators/validatorModule';
import { ResponseValidator } from '../../util/modules/validators/responses/responseValidatorModule';
import { routes } from 'src/app/routing.module';

describe('[IntegrationTest] AuthService', () => {
  const loginUrl = 'http://localhost:1212/api/User/Login';
  let sut: AuthService;

  // dependencies
  let httpMock: HttpTestingController;

  let utilServiceStub = {} as UtilService;
  let validatorStub = {} as Validator;
  let responseValidatorStub = {} as ResponseValidator;
  let isLoginResponseValidMock = true;

  beforeAll(() => {
    responseValidatorStub = { isLoginResponseValid : jest.fn(() => isLoginResponseValidMock) };
    validatorStub = { responseValidator : responseValidatorStub };
    utilServiceStub = { validator: validatorStub };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        AuthService,
        {provide: UtilService, useValue: utilServiceStub}
      ]
    });
    sut = TestBed.inject(AuthService);
    TestBed.inject(UtilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // beforeEach(() => {
  //   // mock
  //   isLoginResponseValidMock = true;
  // });

  afterEach(() => {
    httpMock.verify();
  });


  it('login: should call http POST method for the given route',  () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    

    const req = httpMock.expectOne(loginUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('login: loginResponse should be checked via ValidatorModule', () => {
    // spy
    const isLoginResponseValidSpy = jest.spyOn(responseValidatorStub, 'isLoginResponseValid');

    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    expect(isLoginResponseValidSpy).toHaveBeenCalled();
  });

  it('login: loginResponse with success check should BE authenticated', () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    const actual = sut.isAuthenticated.value;
    expect(actual).toEqual(true);
  });

  it('login: loginResponse with failure check should NOT BE authenticated', () => {
    // mock
    isLoginResponseValidMock = false;
    
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    const actual = sut.isAuthenticated.value;
    expect(actual).toEqual(false);
  });

  it('logout: logout WITH user previously authenticated', () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    sut.logout();
    const actual = sut.isAuthenticated.value;
    expect(actual).toEqual(false);
  });

  it('logout: logout WITH user previously authenticated', () => {
    sut.logout();
    const actual = sut.isAuthenticated.value;
    expect(actual).toEqual(false);
  });
});
