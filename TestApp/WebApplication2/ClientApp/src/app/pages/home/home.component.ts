import { SearchType } from './../../models/internal-types/home/searchTypes/searchTypes.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  selectedSearch: SearchType;

  constructor() {
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.selectedSearch = SearchType.TopRatedMoviesSearch;
  }

}
