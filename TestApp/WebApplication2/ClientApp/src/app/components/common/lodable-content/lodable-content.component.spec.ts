/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LodableContentComponent } from './lodable-content.component';

describe('LodableContentComponent', () => {
  let component: LodableContentComponent;
  let fixture: ComponentFixture<LodableContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LodableContentComponent ],
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
