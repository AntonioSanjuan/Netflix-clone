import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
// tslint:disable-next-line: component-selector
import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';

@Component({
  selector: 'app-genreMovieSearch',
  templateUrl: './genreMovieSearch.component.html',
  styleUrls: ['./genreMovieSearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreMovieSearchComponent implements OnInit {
  fetchedMovieGenres: IGetMovieGenreResponseDto;
  fetchedPage = 1;

  isLoading = false;

  constructor(
    private movieDBService: MovieDBService,
    private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.fetchGenreMovies(1);
  }

  private async fetchGenreMovies(pageNumber: number) {
    this.isLoading = true;
    await this.movieDBService.getMovieGenres().then((movieGenresResponse) => {
      console.log(movieGenresResponse);
      this.fetchedMovieGenres = {...movieGenresResponse};
      this.fetchedPage = pageNumber;

      this.isLoading = false;

      // cd update
      this.cdRef.markForCheck();
    });
  }
}
