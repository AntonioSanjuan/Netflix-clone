import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/getTopRatedMoviesResponse.model';
// tslint:disable-next-line: component-selector
import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';
import { MovieInfoGenres } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';

@Component({
  selector: 'app-filterMovieSearch',
  templateUrl: './filterMovieSearch.component.html',
  styleUrls: ['./filterMovieSearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMovieSearchComponent implements OnInit {
  genres: IGetMovieGenreResponseDto;
  filteredMovies: IGetTopRatedMoviesResponseDto;
  fetchedPage = 1;

  isLoading = false;

  selectedGenre: MovieInfoGenres;
  constructor(
    private movieDBService: MovieDBService,
    private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.initialize();
  }

  public getfilterPage(page: number) {
    this.fetchFilteredMovies(page);
  }

  public setFilters() {
    
  }

  private initialize() {
    this.fetchFilters();
    this.fetchFilteredMovies(1);
  }

  private async fetchFilters() {
    await this.fetchGenres();
  }

  private async fetchGenres() {
    await this.movieDBService.getMovieGenres().then((movieGenresResponse) => {
      this.genres = {...movieGenresResponse};
    });
  }

  private async fetchFilteredMovies(pageNumber: number) {
    this.isLoading = true;
    await this.movieDBService.getTopRatedMovies(pageNumber).then((topRatedMoviesResponse) => {
      this.filteredMovies = {...topRatedMoviesResponse};
      this.fetchedPage = pageNumber;

      this.isLoading = false;

      // cd update
      this.cdRef.markForCheck();
    });
  }
}
