import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  @Input() selectedPage: number;
  @Input() pagesToShow: number;

  @Output() pageSelectionEvent: EventEmitter;

  startPage: number = undefined;
  goToLastPageAvailable: boolean = undefined;
  goToFirstPageAvailable: boolean = undefined;
  constructor() { }

  ngOnInit() {
    this.calculateStartPage();
  }

  private calculateStartPage() {
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
  }

  private setStartOverflowState() {
    this.startPage = 1;
    this.goToLastPageAvailable = true;
    this.goToFirstPageAvailable = false;
  }

  private setEndOverflowState() {
    this.startPage = this.numberOfPages - this.pagesToShow;
    this.goToLastPageAvailable = false;
    this.goToFirstPageAvailable = true;
  }

  private setNoOverflowState(startPage: number) {
    this.startPage = startPage;
    this.goToLastPageAvailable = true;
    this.goToFirstPageAvailable = true;
  }
}
