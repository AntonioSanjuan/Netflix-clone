import { MovieDBServicesEnumNames } from 'src/app/models/dataSupplier-models/serviceNames.mode';

export class MovieDBServiceNameModule {
  protected baseUrl: string;
  protected controllerSuburl = 'api/Movie/';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl + this.controllerSuburl;
 }
  getTopRatedMoviesUrl(): string {
    return this.baseUrl + MovieDBServicesEnumNames.GetTopRatedMovies;
 }
}
