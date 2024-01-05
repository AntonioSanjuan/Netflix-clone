import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ResponseValidator } from '../util/modules/validators/responses/responseValidatorModule';
import { Validator } from '../util/modules/validators/validatorModule';
import { UtilService } from '../util/utils.service';
import { MovieDBService } from './movieDB-fetch.service';

describe('[IntegrationTest] MovieDBService', () => {
  const topRatedMoviesUrl = 'https://localhost:44339/api/Movie/TopRatedMovies';
  const movieInfoUrl = 'https://localhost:44339/api/Movie/GetMovieInfo';
  const movieGenresUrl = 'https://localhost:44339/api/Movie/GetMovieGenres';
  const moviesByGenreUrl = 'https://localhost:44339/api/Movie/GetMoviesByGenre';

  let sut: MovieDBService;

  // dependencies
  let httpMock: HttpTestingController;

  let utilServiceStub = {} as UtilService;
  let validatorStub = {} as Validator;
  let responseValidatorStub = {} as ResponseValidator;
  let isLoginResponseValidMock = true;
  let isGetTopRatedMoviesResponseValidMock = true;
  let isGetMovieInfoResponseValidMock = true;
  let isGetMovieGenresResponseValidMock = true;
  let isGetMoviesByGenreResponseValidMock = true;

  beforeEach(() => {
    isLoginResponseValidMock = true;
    isGetTopRatedMoviesResponseValidMock = true;

    responseValidatorStub = { isLoginResponseValid : jest.fn(() => isLoginResponseValidMock),
                              isGetTopRatedMoviesResponseValid: jest.fn(() => isGetTopRatedMoviesResponseValidMock),
                              isGetMovieInfoResponseValid: jest.fn(() => isGetMovieInfoResponseValidMock),
                              isGetMovieGenresResponseValid: jest.fn(() => isGetMovieGenresResponseValidMock),
                              isGetMoviesByGenreResponseValid: jest.fn(() => isGetMoviesByGenreResponseValidMock)
                            };
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

  it('getMovieInfo() should call http POST method for the given route',  () => {
    sut.getMovieInfo(0).then(
      async () => {
      }
    );

    const req = httpMock.expectOne(movieInfoUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('getMovieGenres() should call http POST method for the given route',  () => {
    sut.getMovieGenres().then(
      async () => {
      }
    );

    const req = httpMock.expectOne(movieGenresUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('getMoviesByGenre() should call http POST method for the given route',  () => {
    sut.GetMoviesByGenre(1, 0 ).then(
      async () => {
      }
    );

    const req = httpMock.expectOne(moviesByGenreUrl);
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

  it('getMovieInfo() getMovieInfoResponse should be checked via ValidatorModule', () => {
    // spy
    const isMovieInfoResponseValidSpy = jest.spyOn(responseValidatorStub, 'isGetMovieInfoResponseValid');

    sut.getMovieInfo(0).then(
      async () => {
      }
    );
    const req = httpMock.expectOne(movieInfoUrl);
    req.flush({});

    expect(isMovieInfoResponseValidSpy).toHaveBeenCalled();
  });

  it('getMovieGenres() getMovieGenresResponse should be checked via ValidatorModule', () => {
    // spy
    const isMovieInfoResponseValidSpy = jest.spyOn(responseValidatorStub, 'isGetMovieGenresResponseValid');

    sut.getMovieGenres().then(
      async () => {
      }
    );
    const req = httpMock.expectOne(movieGenresUrl);
    req.flush({});

    expect(isMovieInfoResponseValidSpy).toHaveBeenCalled();
  });

  it('getMoviesByGenre() getMoviesByGenreResponse should be checked via ValidatorModule', () => {
    // spy
    const isMovieInfoResponseValidSpy = jest.spyOn(responseValidatorStub, 'isGetMoviesByGenreResponseValid');

    sut.GetMoviesByGenre(1, 0).then(
      async () => {
      }
    );
    const req = httpMock.expectOne(moviesByGenreUrl);
    req.flush({});

    expect(isMovieInfoResponseValidSpy).toHaveBeenCalled();
  });
});
