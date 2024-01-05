import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';
// tslint:disable-next-line: component-selector
import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';
import { IGetMoviesByGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMoviesByGenres/getMoviesByGenreResponse.model';
import { Movie } from 'src/app/models/dataSupplier-models/Common/movie.model';
import { MovieInfoGenres } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';

@Component({
  selector: 'app-genreMovieSearch',
  templateUrl: './genreMovieSearch.component.html',
  styleUrls: ['./genreMovieSearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreMovieSearchComponent implements OnInit {
  public fetchedMovieGenres: IGetMovieGenreResponseDto;
  private moviesByGenreMap = new Map<MovieInfoGenres, IGetMoviesByGenreResponseDto>();

  constructor(
    private movieDBService: MovieDBService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.fetchGenreMovies();
  }

  private async fetchGenreMovies() {
    await this.movieDBService.getMovieGenres().then((movieGenresResponse) => {
      this.fetchedMovieGenres = {...movieGenresResponse};

      this.fetchMoviesByGenres().then(() => {});
    });
  }

  private async fetchMoviesByGenres() {
    let promises = [];
    let page = 1;
    this.fetchedMovieGenres.content.genres.forEach(async (genre) => {
      promises.push(this.fetchMoviesByGenre(genre, page));
    });

    await Promise.all(promises);
  }

  private fetchMoviesByGenre(genre: MovieInfoGenres, page: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.movieDBService.GetMoviesByGenre(page, genre.id).then((moviesByGenre) => {
        this.setMoviesByGenres(genre, moviesByGenre);
        
        // cd update
        this.cdRef.markForCheck();
        resolve();
      });
    });
  }

  private setMoviesByGenres(genre: MovieInfoGenres, moviesByGenre: IGetMoviesByGenreResponseDto) {
    this.moviesByGenreMap.set(
      genre, 
      moviesByGenre, 
    );
  }

  public isGenreFilled(genre: MovieInfoGenres): boolean{
    return this.moviesByGenreMap.has(genre);
  }

  public getMoviesByGenre(genre: MovieInfoGenres): Movie[] {
    if(this.isGenreFilled(genre)){
      return this.moviesByGenreMap.get(genre).content.movies;
    }
  }
}
