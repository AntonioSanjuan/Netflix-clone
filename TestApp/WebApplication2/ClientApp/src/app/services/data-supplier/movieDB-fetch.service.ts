import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MovieGenresRequestDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreRequest.model';
import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';
import { GetMovieInfoRequestDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoRequest.model';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';
import { MoviesByGenreRequestDto } from 'src/app/models/dataSupplier-models/GetMoviesByGenres/getMoviesByGenreRequest.model';
import { IGetMoviesByGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMoviesByGenres/getMoviesByGenreResponse.model';
import { GetTopRatedMoviesRequestDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/getTopRatedMoviesRequest.model';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/getTopRatedMoviesResponse.model';
import { DataSupplierServicesNames } from 'src/app/modules/serviceNameModule/dataSupplierServiceNameModule/dataSupplierServiceNamesModule';

import { UtilService } from '../util/utils.service';

@Injectable({
  providedIn: 'root'
})

export class MovieDBService {
  // appSettings service (?)
  private baseUrl = 'https://localhost:44339/';

  private movieServicesNames: DataSupplierServicesNames;

  constructor(
    private http: HttpClient,
    private utilService: UtilService) {
      this.movieServicesNames = new DataSupplierServicesNames(this.baseUrl);
    }

  private processGetTopRatedMoviesResponse(getTopRatedMoviesResponse: IGetTopRatedMoviesResponseDto): IGetTopRatedMoviesResponseDto | undefined {
    if (this.utilService.validator.responseValidator.isGetTopRatedMoviesResponseValid(getTopRatedMoviesResponse)) {
      // to-do
      // save into new server aka (data provider cache service) ??
    }
    return getTopRatedMoviesResponse;
  }

  private processGetMovieInfoResponse(getMovieInfoResponse: IGetMovieInfoResponseDto): IGetMovieInfoResponseDto | undefined {
    if (this.utilService.validator.responseValidator.isGetMovieInfoResponseValid(getMovieInfoResponse)) {
      // to-do
      // save into new server aka (data provider cache service) ??
    }
    return getMovieInfoResponse;
  }

  private processGetMovieGenresResponse(getMovieInfoResponse: IGetMovieGenreResponseDto): IGetMovieGenreResponseDto | undefined {
    if (this.utilService.validator.responseValidator.isGetMovieGenresResponseValid(getMovieInfoResponse)) {
      // to-do
      // save into new server aka (data provider cache service) ??
    }
    return getMovieInfoResponse;
  }

  private processGetMoviesByGenreResponse(getMoviesByGenreResponse: IGetMoviesByGenreResponseDto){
    if (this.utilService.validator.responseValidator.isGetMoviesByGenreResponseValid(getMoviesByGenreResponse)) {
      // to-do
      // save into new server aka (data provider cache service) ??
    }
    return getMoviesByGenreResponse;
  }
  public async getTopRatedMovies(page: number) {
    const getTopRatedMoviesRequestUrl: string = this.movieServicesNames.movieDB.getTopRatedMoviesUrl();
    const getTopRatedMoviesRequestContent: GetTopRatedMoviesRequestDto = new GetTopRatedMoviesRequestDto('en-US', page, '');

    return await this.http.post<IGetTopRatedMoviesResponseDto>(getTopRatedMoviesRequestUrl, getTopRatedMoviesRequestContent).pipe(
      map(response => this.processGetTopRatedMoviesResponse(response))
    ).toPromise();
  }

  public async getMovieInfo(movieId: number) {
    const getMovieInfoRequestUrl: string = this.movieServicesNames.movieDB.getMovieInfoUrl();
    const getMovieInfoRequestContent: GetMovieInfoRequestDto = new GetMovieInfoRequestDto('en-US', movieId);

    return await this.http.post<IGetMovieInfoResponseDto>(getMovieInfoRequestUrl, getMovieInfoRequestContent).pipe(
      map(response => this.processGetMovieInfoResponse(response))
    ).toPromise();
  }

  public async getMovieGenres() {
    const getMovieGenresRequestUrl: string = this.movieServicesNames.movieDB.getMovieGenresUrl();
    const getMovieGenresRequestContent: MovieGenresRequestDto = new MovieGenresRequestDto('en-US');

    return await this.http.post<IGetMovieGenreResponseDto>(getMovieGenresRequestUrl, getMovieGenresRequestContent).pipe(
      map(response => this.processGetMovieGenresResponse(response))
    ).toPromise();
  }

  public async GetMoviesByGenre(page: number, genreId: number) {
    const getMoviesByGenreRequestUrl: string = this.movieServicesNames.movieDB.getMoviesByGenreUrl();
    const getMoviesByGenreRequestContent: MoviesByGenreRequestDto = new MoviesByGenreRequestDto('en-US', page, genreId, '');

    return await this.http.post<IGetMoviesByGenreResponseDto>(getMoviesByGenreRequestUrl, getMoviesByGenreRequestContent).pipe(
      map(response => this.processGetMoviesByGenreResponse(response))
    ).toPromise();
  }
}
