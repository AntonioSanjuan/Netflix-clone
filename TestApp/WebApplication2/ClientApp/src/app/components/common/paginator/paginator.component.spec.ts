/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initially, input params has default values', () => {
    expect(component.selectedPage).toEqual(1);
    expect(component.pagesToShow).toEqual(1);
    expect(component.numberOfPages).toEqual(1);
  });

  it('startPage should be numberOfPage-pagesToShow if end-overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 9;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(6);
  });

  it('startPage should be 1 if start-overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 2;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(1);
  });

  it('startPage should be numberOfPage no overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 6;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(4);
  });

  it('startPage should be numberOfPage-pagesToShow if end-overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 9;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(5);

  });

  it('startPage should be 1 if start-overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 2;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(1);
  });

  it('startPage should be numberOfPage no overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 6;

    component.ngOnInit();

    expect(component.pages[0]).toEqual(4);
  });

  it('goTo first/last page should be calculated (end-overflow exists)', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 9;

    component.ngOnInit();

    expect(component.goToFirstPageAvailable).toEqual(true);
    expect(component.goToLastPageAvailable).toEqual(false);
  });

  it('goTo first/last page should be calculated (start-overflow exists)', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 2;

    component.ngOnInit();

    expect(component.goToFirstPageAvailable).toEqual(false);
    expect(component.goToLastPageAvailable).toEqual(true);
  });

  it('goTo first/last page should be calculated (no overflow exists)', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 6;

    component.ngOnInit();

    expect(component.goToFirstPageAvailable).toEqual(true);
    expect(component.goToLastPageAvailable).toEqual(true);
  });
});
