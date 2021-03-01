import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetMovieInfoRequestDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/GetMovieInfoRequest.model';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/GetMovieInfoResponse.model';
import { GetTopRatedMoviesRequestDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesRequest.model';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
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
}
