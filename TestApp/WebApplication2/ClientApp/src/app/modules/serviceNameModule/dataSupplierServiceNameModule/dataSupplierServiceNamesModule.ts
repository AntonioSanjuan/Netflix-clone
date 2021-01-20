import { MovieDBServiceNameModule } from './DataSuppliers/MovieDBServiceNameModule';

export class DataSupplierServicesNames {
    movieDB: MovieDBServiceNameModule;

    constructor(baseUrl: string) {
      this.movieDB = new MovieDBServiceNameModule(baseUrl);
    }
}
