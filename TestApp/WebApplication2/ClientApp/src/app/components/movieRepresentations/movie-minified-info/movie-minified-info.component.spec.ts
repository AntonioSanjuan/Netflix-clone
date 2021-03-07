/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieMinifiedInfoComponent } from './movie-minified-info.component';

describe('MovieMinifiedInfoComponent', () => {
  let component: MovieMinifiedInfoComponent;
  let fixture: ComponentFixture<MovieMinifiedInfoComponent>;

  let matdialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieMinifiedInfoComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieMinifiedInfoComponent);
    component = fixture.componentInstance;

    matdialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
