import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { Subject } from 'rxjs';

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

  changeDetectorEvent: Subject<void> = new Subject<void>();
  isLoading = false;

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


  emitChanges() {
    this.changeDetectorEvent.next();
  }

  private unsubscribeAll() {
    // to-do
  }

  public fetchTopRatedPage(page: number) {
    this.fetchTopRatedMovies(page);

  }

  private async fetchTopRatedMovies(pageNumber: number) {
    this.isLoading = true;
    await this.movieDBService.getTopRatedMovies(pageNumber).then((topRatedMoviesResponse) => {
      this.fetchedTopRatedMovies = {...topRatedMoviesResponse};
      this.fetchedPage = pageNumber;

      this.isLoading = false;

      // cd update
      this.emitChanges();
      this.cdRef.markForCheck();
    });
  }
}
