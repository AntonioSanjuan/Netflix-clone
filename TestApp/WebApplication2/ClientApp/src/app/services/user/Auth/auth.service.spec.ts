import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { UtilService } from '../../util/utils.service';
import { Validator } from '../../util/modules/validators/validatorModule';
import { ResponseValidator } from '../../util/modules/validators/responses/responseValidatorModule';

describe('[IntegrationTest] AuthService', () => {
  const loginUrl = 'https://localhost:44339/api/User/Login';
  let sut: AuthService;

  // dependencies
  let httpMock: HttpTestingController;

  let utilServiceStub = {} as UtilService;
  let validatorStub = {} as Validator;
  let responseValidatorStub = {} as ResponseValidator;
  let isLoginResponseValidMock = true;
  let isGetTopRatedMoviesResponseValidMock = true;

  beforeEach(() => {
    isLoginResponseValidMock = true;
    responseValidatorStub = { isLoginResponseValid : jest.fn(() => isLoginResponseValidMock),
      isGetTopRatedMoviesResponseValid: jest.fn(() => isGetTopRatedMoviesResponseValidMock) };
    validatorStub = { responseValidator : responseValidatorStub };
    utilServiceStub = { validator: validatorStub };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        {provide: UtilService, useValue: utilServiceStub},
      ],
    }).compileComponents();

    sut = TestBed.inject(AuthService);
    TestBed.inject(UtilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('login() should call http POST method for the given route',  () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );

    const req = httpMock.expectOne(loginUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('login() loginResponse should be checked via ValidatorModule', () => {
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

  it('login() loginResponse with success check should set authenticated TRUE', () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    const actual = sut.getIsAuthenticated();
    expect(actual).toEqual(true);
  });

  it('login() loginResponse with success check should set authentication subscribe TRUE', () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    sut.getIsAuthenticated$().subscribe((actual) => {
      expect(actual).toEqual(true);
    });
  });

  it('login() loginResponse with failure check should set authentication FALSE', () => {
    // mock
    isLoginResponseValidMock = false;

    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    const actual = sut.getIsAuthenticated();
    expect(actual).toEqual(false);
  });

  it('logout() logout once user has been previously authenticated', () => {
    sut.login('user', 'pass').then(
      async () => {
      }
    );
    const req = httpMock.expectOne(loginUrl);
    req.flush({});

    sut.logout();
    const actual = sut.getIsAuthenticated();
    expect(actual).toEqual(false);
  });

  it('getIsAuthenticated() initially should return FALSE', () => {
    const actual = sut.getIsAuthenticated();
    expect(actual).toEqual(false);
  });

  it('getIsAuthenticated$() initially should return FALSE', () => {
    sut.getIsAuthenticated$().subscribe((actual) => {
      expect(actual).toEqual(true);
    });
  });

  it('logout() logout once user has been previously authenticated', () => {
    sut.logout();
    const actual = sut.getIsAuthenticated();
    expect(actual).toEqual(false);
  });
});
