/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselComponent } from './carrousel.component';
import { MovieMinifiedInfoComponent } from '../../movieRepresentations/movie-minified-info/movie-minified-info.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, QueryList } from '@angular/core';

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

  it('initially, input params has default values', () => {
    expect(component.isNextPageAvailable).toBe(true);
    expect(component.isPrevPageAvailable).toBe(false);
  });

  it('calculateNextCarrouselStep should request the width of carrousel and  carrouselMovies to calculate the css carrousel animation', () => {
    const nativeElementMock = { offsetWidth: 200 };
    const elementRefMock = new ElementRef<any>({ nativeElement: nativeElementMock});
    component.carrousel = elementRefMock;
    // spy
    const carrouselNativeElemntSpy = jest.spyOn(component.carrousel.nativeElement, 'nativeElement');
    // const carrouselMoviesNativeElemntSpy = jest.spyOn(component.carrouselMovies.first.nativeElement, 'offsetWidth', 'get');

    component.selectNextPages();
    expect(carrouselNativeElemntSpy).toHaveBeenCalled();
    // expect(carrouselMoviesNativeElemntSpy).toHaveBeenCalled();
  });
});
