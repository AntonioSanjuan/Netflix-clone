import { GetTopRatedMoviesRequest } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesRequest.model';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMovieSearchComponent } from './topRatedMovieSearch.component';
import { IGetTopRatedMoviesResponse } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';

describe('topRatedMovieSearchComponent', () => {
  let component: TopRatedMovieSearchComponent;
  let fixture: ComponentFixture<TopRatedMovieSearchComponent>;

  let movieDBServiceStub;
  const getTopRatedMock = {} as IGetTopRatedMoviesResponse;

  beforeEach(() => {
    movieDBServiceStub = {
      getTopRatedMovies : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => getTopRatedMock) )
    }
    TestBed.configureTestingModule({
      declarations: [ TopRatedMovieSearchComponent ],
      providers: [
        {provide: MovieDBService, useValue: movieDBServiceStub},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedMovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialy should request topRatedMovies page 0 to movieDBService, ', () => {
      // spy
      const getTopRatedMoviesSpy = jest.spyOn(movieDBServiceStub, 'getTopRatedMovies');
      expect(getTopRatedMoviesSpy).toHaveBeenCalledWith(0);
  });
});
