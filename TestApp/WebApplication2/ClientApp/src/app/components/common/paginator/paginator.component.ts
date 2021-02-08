import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() numberOfPages = 1;
  @Input() selectedPage = 1;
  @Input() pagesToShow = 1;

  @Output() pageSelectionEvent = new EventEmitter<number>();

  private startPage: number = undefined;

  pages = [];
  goToLastPageAvailable: boolean = undefined;
  goToFirstPageAvailable: boolean = undefined;

  constructor() { }

  ngOnInit() {
    this.calculatePages();
  }

  ngOnChanges() {
    this.calculatePages();
  }

  public selecPage(page: number) {
    this.pageSelectionEvent.emit(page);
  }

  public selectLastPage() {
    this.pageSelectionEvent.emit(this.numberOfPages);
  }

  public selectFirstPage() {
    this.pageSelectionEvent.emit(1);
  }

  private calculatePages() {
    const sideElements = this.pagesToShow / 2;

    const auxFirstPageToShow = this.selectedPage - sideElements;
    const auxLastPageToShow = this.selectedPage + sideElements;

    if ((auxFirstPageToShow >= 1) && ( auxLastPageToShow <= this.numberOfPages)) {
      this.setNoOverflowState(auxFirstPageToShow);
    } else if ((auxFirstPageToShow < 1) && ( auxLastPageToShow <= this.numberOfPages)) {
      this.setStartOverflowState();
    } else if ((auxFirstPageToShow >= 1) && ( auxLastPageToShow > this.numberOfPages)) {
      this.setEndOverflowState();
    }

    this.setPages();
  }

  private setStartOverflowState() {
    this.startPage = 1;
    this.goToLastPageAvailable = true;
    this.goToFirstPageAvailable = false;
  }

  private setEndOverflowState() {
    this.startPage = this.numberOfPages - this.pagesToShow + 1;
    this.goToLastPageAvailable = false;
    this.goToFirstPageAvailable = true;
  }

  private setNoOverflowState(startPage: number) {
    this.startPage = Math.floor(startPage + 1);
    this.goToLastPageAvailable = true;
    this.goToFirstPageAvailable = true;
  }

  private setPages() {
    this.pages = Array.from({length: this.pagesToShow}, (v , k) => k + this.startPage);
  }
}
