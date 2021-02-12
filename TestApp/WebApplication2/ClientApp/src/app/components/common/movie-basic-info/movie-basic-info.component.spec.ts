/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { MovieBasicInfoComponent } from './movie-basic-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

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

  it('openDialog should request matDialog opem', () => {
    const matDialogSpy = spyOn(matdialog, 'open')
    .and
    .returnValue({afterClosed: () => EMPTY});

    component.openDialog();
    expect(matDialogSpy).toHaveBeenCalled();
  });
});
