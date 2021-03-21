/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieLibraryComponent } from './movieLibrary.component';

describe('MovieMinifiedInfoComponent', () => {
  let component: MovieLibraryComponent;
  let fixture: ComponentFixture<MovieLibraryComponent>;

  let matdialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieLibraryComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLibraryComponent);
    component = fixture.componentInstance;
    matdialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
