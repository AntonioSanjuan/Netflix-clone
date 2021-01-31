import { Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { IGetTopRatedMoviesResponse } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-topRatedMovieSearch',
  templateUrl: './topRatedMovieSearch.component.html',
  styleUrls: ['./topRatedMovieSearch.component.scss']
})
export class TopRatedMovieSearchComponent implements OnInit, OnDestroy {
  fetchedTopRatedMovies: IGetTopRatedMoviesResponse;
  fetchedPage = 0;

  constructor(
    private movieDBService: MovieDBService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private initialize() {
    this.fetchTopRatedMovies(0);
  }

  private unsubscribeAll() {
    // to-do
  }

  private async fetchTopRatedMovies(pageNumber: number) {
    await this.movieDBService.getTopRatedMovies(pageNumber).then((topRatedMoviesResponse) => {
      this.fetchedTopRatedMovies = topRatedMoviesResponse;
      this.fetchedPage = pageNumber;
    });
  }

}
