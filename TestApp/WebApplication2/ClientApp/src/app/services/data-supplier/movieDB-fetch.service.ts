import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetTopRatedMoviesRequest } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesRequest.model';
import { IGetTopRatedMoviesResponse } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
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

  private processGetTopRatedMoviesResponset(getTopRatedMoviesResponse: IGetTopRatedMoviesResponse): IGetTopRatedMoviesResponse | undefined {
    if (this.utilService.validator.responseValidator.isGetTopRatedMoviesResponseValid(getTopRatedMoviesResponse)) {
      // to-do
      // save into new server aka (data provider cache service) ??
    }
    return getTopRatedMoviesResponse;
  }

  public async getTopRatedMovies(page: number) {
    const getTopRatedMoviesRequestUrl: string = this.movieServicesNames.movieDB.getTopRatedMoviesUrl();
    const getTopRatedMoviesRequestContent: GetTopRatedMoviesRequest = new GetTopRatedMoviesRequest('en-US', page, '');

    return await this.http.post<IGetTopRatedMoviesResponse>(getTopRatedMoviesRequestUrl, getTopRatedMoviesRequestContent).pipe(
      map(response => this.processGetTopRatedMoviesResponset(response))
    ).toPromise();
  }
}
