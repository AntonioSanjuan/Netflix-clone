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

  it('startPage should be numberOfPage-pagesToShow if end-overflow exists, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 2;

    expect(component.startPage).toEqual(component.numberOfPages - component.pagesToShow);
  });

  it('startPage should be 1 if start-overflow exists, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 9;

    expect(component.startPage).toEqual(1);
  });

  it('startPage should be numberOfPage no overflow exists, ', () => {
    component.numberOfPages = 10;
    component.pagesToShow = 5;
    component.selectedPage = 6;

    expect(component.startPage).toBeGreaterThan(1);
    expect(component.startPage).toBeLessThanOrEqual(component.numberOfPages - component.pagesToShow);
  });
});
