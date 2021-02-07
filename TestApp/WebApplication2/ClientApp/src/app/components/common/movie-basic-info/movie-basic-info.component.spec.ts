/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { MovieBasicInfoComponent } from './movie-basic-info.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MovieBasicInfoComponent', () => {
  let component: MovieBasicInfoComponent;
  let fixture: ComponentFixture<MovieBasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBasicInfoComponent ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
