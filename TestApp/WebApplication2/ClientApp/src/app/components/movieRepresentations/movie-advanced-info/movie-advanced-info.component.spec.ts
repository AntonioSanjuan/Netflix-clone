/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MovieAdvancedInfoComponent } from './movie-advanced-info.component';
import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';

describe('MovieAdvancedInfoComponent', () => {
  let component: MovieAdvancedInfoComponent;
  let fixture: ComponentFixture<MovieAdvancedInfoComponent>;

  let matDialogDataStub = {};
  let movieDBServiceStub;
  const getMovieInfoMock = {} as IGetMovieInfoResponseDto;

  beforeEach(() => {
    matDialogDataStub
    movieDBServiceStub = {
      getMovieInfo : jest.fn(() => new Promise((resolve, reject) => resolve({})).then(() => getMovieInfoMock) ),
    };

    TestBed.configureTestingModule({
      declarations: [ MovieAdvancedInfoComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: matDialogDataStub },
        {provide: MovieDBService, useValue: movieDBServiceStub}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAdvancedInfoComponent);
    component = fixture.componentInstance;

    const movie = {
      movieId: -1,
    };  
    matDialogDataStub = movie as Movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialy should request getMovieInfo for received movie, ', () => {
    // spy
    const getMovieInfoSpy = jest.spyOn(movieDBServiceStub, 'getMovieInfo');
    expect(getMovieInfoSpy).toHaveBeenCalledWith(-1);
  });

});
