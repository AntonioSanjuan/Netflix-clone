/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { MovieBasicInfoComponent } from './movie-basic-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { TopRatedImages, TopRatedMovie } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { stringify } from '@angular/compiler/src/util';

describe('MovieBasicInfoComponent', () => {
  let component: MovieBasicInfoComponent;
  let fixture: ComponentFixture<MovieBasicInfoComponent>;

  let matdialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBasicInfoComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBasicInfoComponent);
    component = fixture.componentInstance;

    matdialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openImageDialog should request matDialog open', () => {
    // mock
    const movie = {
      images: {
        backdropImageToBase64: '',
        posterImageToBase64: '',
        movieId: 0
      }
    };  
    component.movie = movie as TopRatedMovie;


    const matDialogSpy = spyOn(matdialog, 'open')
    .and
    .returnValue({afterClosed: () => EMPTY});

    component.openImageDialog();
    expect(matDialogSpy).toHaveBeenCalled();
  });

  it('openMovieInfoDialog should request matDialog open', () => {
    const matDialogSpy = spyOn(matdialog, 'open')
    .and
    .returnValue({afterClosed: () => EMPTY});

    component.openMovieInfoDialog();
    expect(matDialogSpy).toHaveBeenCalled();
  });
});
