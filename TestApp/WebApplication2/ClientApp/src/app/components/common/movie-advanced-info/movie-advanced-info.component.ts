import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/GetMovieInfoResponse.model';
import { TopRatedMovie } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { MovieDBService } from 'src/app/services/data-supplier/movieDB-fetch.service';

@Component({
  selector: 'app-movie-advanced-info',
  templateUrl: './movie-advanced-info.component.html',
  styleUrls: ['./movie-advanced-info.component.scss']
})
export class MovieAdvancedInfoComponent implements OnInit {
  movieInfo: IGetMovieInfoResponseDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TopRatedMovie,
    private movieDBService: MovieDBService
  ) { }

  ngOnInit() {
    this.movieDBService.getMovieInfo(this.data.movieId).then((getMovieInfoResponse: IGetMovieInfoResponseDto) => {
      this.movieInfo = getMovieInfoResponse;
    })
  }

}
