/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LodableContentComponent } from './lodable-content.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

describe('LodableContentComponent', () => {
  let component: LodableContentComponent;
  let fixture: ComponentFixture<LodableContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LodableContentComponent, LoadingSpinnerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LodableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
