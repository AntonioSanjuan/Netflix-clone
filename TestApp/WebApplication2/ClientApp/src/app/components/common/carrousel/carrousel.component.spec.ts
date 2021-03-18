/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselComponent } from './carrousel.component';
import { MovieMinifiedInfoComponent } from '../../movieRepresentations/movie-minified-info/movie-minified-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CarrouselComponent', () => {
  let component: CarrouselComponent;
  let fixture: ComponentFixture<CarrouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselComponent, MovieMinifiedInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
