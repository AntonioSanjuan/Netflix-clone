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
  }

}
