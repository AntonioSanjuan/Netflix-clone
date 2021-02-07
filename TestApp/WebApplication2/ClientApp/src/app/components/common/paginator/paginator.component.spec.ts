/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
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

  it('startPage should be numberOfPage-pagesToShow if end-overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 9;

    component.ngOnInit();

    expect(component.startPage).toEqual(component.numberOfPages - component.pagesToShow);
  });

  it('startPage should be 1 if start-overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 2;

    component.ngOnInit();

    expect(component.startPage).toEqual(1);
  });

  it('startPage should be numberOfPage no overflow exists with odd pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 6;

    component.ngOnInit();

    expect(component.startPage).toBeGreaterThan(1);
    expect(component.startPage).toBeLessThan(component.numberOfPages - component.pagesToShow);
  });

  it('startPage should be numberOfPage-pagesToShow if end-overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 9;

    component.ngOnInit();

    expect(component.startPage).toEqual(component.numberOfPages - component.pagesToShow);

  });

  it('startPage should be 1 if start-overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 2;

    component.ngOnInit();

    expect(component.startPage).toEqual(1);
  });

  it('startPage should be numberOfPage no overflow exists with pair pagesToShow value, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 6;
    component.selectedPage = 6;

    component.ngOnInit();

    expect(component.startPage).toBeGreaterThan(1);
    expect(component.startPage).toBeLessThan(component.numberOfPages - component.pagesToShow);
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
