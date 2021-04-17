import { SearchType } from './../../models/internal-types/home/searchTypes/searchTypes.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent  implements OnInit {
  selectedSearch: SearchType;
  searchTypes = SearchType;
  
  constructor() {
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.selectedSearch = SearchType.TopRatedMovieSearch;
  }
}
