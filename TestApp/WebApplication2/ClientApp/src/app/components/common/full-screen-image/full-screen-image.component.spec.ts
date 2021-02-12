/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FullScreenImageComponent } from './full-screen-image.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('FullScreenImageComponent', () => {
  let component: FullScreenImageComponent;
  let fixture: ComponentFixture<FullScreenImageComponent>;

  let matDialogRefStub;
  let MAT_DIALOG_DATAStub: string;

  beforeEach(() => {

    matDialogRefStub = {
      close: jest.fn(() => {})
    }

    TestBed.configureTestingModule({
      declarations: [ FullScreenImageComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MAT_DIALOG_DATAStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
