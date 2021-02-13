import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMovieSearchComponent } from './topRatedMovieSearch.component';
import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { MovieBasicInfoComponent } from 'src/app/components/common/movie-basic-info/movie-basic-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LodableContentComponent } from 'src/app/components/common/lodable-content/lodable-content.component';

describe('topRatedMovieSearchComponent', () => {
  let component: TopRatedMovieSearchComponent;
  let fixture: ComponentFixture<TopRatedMovieSearchComponent>;
  let changeDetector: ChangeDetectorRef;

  let movieDBServiceStub;
  let changeDetectorRefStub;
  const getTopRatedMock = {} as IGetTopRatedMoviesResponseDto;

  beforeEach(() => {
    changeDetectorRefStub = {
      markForCheck : jest.fn(() => {})
    };
    movieDBServiceStub = {
      getTopRatedMovies : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => getTopRatedMock) )
    };

    TestBed.configureTestingModule({
      declarations: [ TopRatedMovieSearchComponent, MovieBasicInfoComponent, LodableContentComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: MovieDBService, useValue: movieDBServiceStub},
        {provide: ChangeDetectorRef, useValue: changeDetectorRefStub}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedMovieSearchComponent);
    component = fixture.componentInstance;
    changeDetector = TestBed.inject(ChangeDetectorRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialy should request topRatedMovies page 0 to movieDBService, ', () => {
    // spy
    const getTopRatedMoviesSpy = jest.spyOn(movieDBServiceStub, 'getTopRatedMovies');
    expect(getTopRatedMoviesSpy).toHaveBeenCalledWith(1);
  });

});
