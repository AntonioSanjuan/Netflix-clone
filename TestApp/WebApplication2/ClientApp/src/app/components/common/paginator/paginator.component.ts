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

  constructor() { }

  ngOnInit() {
    this.calculateStartPage();
  }

  private calculateStartPage() {
    const sideElements = this.pagesToShow / 2;
    const pagesToShowIsPair  = (this.pagesToShow % 2) === 0;

    let auxFirstPageToShow: number;
    const auxLastPageToShow = this.selectedPage + sideElements;
    if (pagesToShowIsPair) {
      auxFirstPageToShow = this.selectedPage - sideElements;
    } else {
      auxFirstPageToShow = this.selectedPage - sideElements;
    }

    if ((auxFirstPageToShow >= 1) && ( auxLastPageToShow <= this.numberOfPages)) {
      this.startPage = auxFirstPageToShow;
    } else if ((auxFirstPageToShow < 1) && ( auxLastPageToShow <= this.numberOfPages)) {
      this.startPage = 1;
    } else if ((auxFirstPageToShow >= 1) && ( auxLastPageToShow > this.numberOfPages)) {
      this.startPage = this.numberOfPages - this.pagesToShow;
    }


  }

}
