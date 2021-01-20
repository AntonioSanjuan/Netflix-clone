import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ResponseValidator } from '../util/modules/validators/responses/responseValidatorModule';
import { Validator } from '../util/modules/validators/validatorModule';
import { UtilService } from '../util/utils.service';
import { MovieDBService } from './movieDB-fetch.service';

describe('[IntegrationTest] MovieDBService', () => {
  const topRatedMoviesUrl = 'https://localhost:44339/api/Movie/TopRatedMovies';
  let sut: MovieDBService;

  // dependencies
  let httpMock: HttpTestingController;

  let utilServiceStub = {} as UtilService;
  let validatorStub = {} as Validator;
  let responseValidatorStub = {} as ResponseValidator;
  let isLoginResponseValidMock = true;
  let isGetTopRatedMoviesResponseValidMock = true;

  beforeEach(() => {
    isLoginResponseValidMock = true;
    isGetTopRatedMoviesResponseValidMock = true;

    responseValidatorStub = { isLoginResponseValid : jest.fn(() => isLoginResponseValidMock),
                              isGetTopRatedMoviesResponseValid: jest.fn(() => isGetTopRatedMoviesResponseValidMock) };
    validatorStub = { responseValidator : responseValidatorStub };
    utilServiceStub = { validator: validatorStub };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        MovieDBService,
        {provide: UtilService, useValue: utilServiceStub},
      ],
    }).compileComponents();

    sut = TestBed.inject(MovieDBService);
    TestBed.inject(UtilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getTopRatedMovies() should call http POST method for the given route',  () => {
    sut.getTopRatedMovies(0).then(
      async () => {
      }
    );

    const req = httpMock.expectOne(topRatedMoviesUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});

  });

  it('getTopRatedMovies() getTopRatedMoviesResponse should be checked via ValidatorModule', () => {
    // spy
    const isTopRatedMoviesResponseValidSpy = jest.spyOn(responseValidatorStub, 'isGetTopRatedMoviesResponseValid');

    sut.getTopRatedMovies(0).then(
      async () => {
      }
    );
    const req = httpMock.expectOne(topRatedMoviesUrl);
    req.flush({});

    expect(isTopRatedMoviesResponseValidSpy).toHaveBeenCalled();
  });
});
