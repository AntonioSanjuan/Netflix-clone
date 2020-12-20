import { DataSupplierServicesEnumNames } from 'src/app/models/dataSupplier-models/serviceNames.mode';

export class DataSupplierServicesNames {
    protected baseUrl: string;
    protected controllerSuburl = 'api/Movie/';

    constructor(baseUrl: string) {
       this.baseUrl = baseUrl + this.controllerSuburl;
    }

}
