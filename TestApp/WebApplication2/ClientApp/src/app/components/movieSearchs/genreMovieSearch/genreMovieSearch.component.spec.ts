/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GenreMovieSearchComponent } from './genreMovieSearch.component';
import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';

describe('genreMovieSearchComponent', () => {
  let component: GenreMovieSearchComponent;
  let fixture: ComponentFixture<GenreMovieSearchComponent>;
  let changeDetector: ChangeDetectorRef;

  let movieDBServiceStub;
  let changeDetectorRefStub;
  const getGenresMock = {} as IGetMovieGenreResponseDto;

  beforeEach(() => {
    changeDetectorRefStub = {
      markForCheck : jest.fn(() => {})
    };
    movieDBServiceStub = {
      getMovieGenres : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => getGenresMock) )
    };

    TestBed.configureTestingModule({
      declarations: [ GenreMovieSearchComponent ],
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

    fixture = TestBed.createComponent(GenreMovieSearchComponent);
    component = fixture.componentInstance;
    changeDetector = TestBed.inject(ChangeDetectorRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialy should request topRatedMovies page 0 to movieDBService, ', () => {
    // spy
    const getTopRatedMoviesSpy = jest.spyOn(movieDBServiceStub, 'getMovieGenres');
    expect(getTopRatedMoviesSpy).toHaveBeenCalled();
  });

});
