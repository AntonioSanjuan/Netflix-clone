import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-topRatedMovieSearch',
  templateUrl: './topRatedMovieSearch.component.html',
  styleUrls: ['./topRatedMovieSearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopRatedMovieSearchComponent implements OnInit, OnDestroy {
  fetchedTopRatedMovies: IGetTopRatedMoviesResponseDto;
  fetchedPage = 1;

  constructor(
    private movieDBService: MovieDBService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private initialize() {
    this.fetchTopRatedMovies(1);
  }

  private unsubscribeAll() {
    // to-do
  }

  private async fetchTopRatedMovies(pageNumber: number) {
    await this.movieDBService.getTopRatedMovies(pageNumber).then((topRatedMoviesResponse) => {
      this.fetchedTopRatedMovies = {...topRatedMoviesResponse};
      this.fetchedPage = pageNumber;
      // cd update
      this.cdRef.markForCheck();
    });
  }
}
