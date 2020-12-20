import { UserServicesEnumNames } from 'src/app/models/user-models/serviceNames.model';

export class UserServicesNames {
    protected baseUrl: string;
    protected controllerSuburl = 'api/User/';

    constructor(baseUrl: string) {
       this.baseUrl = baseUrl + this.controllerSuburl;
    }

    getLoginUrl(): string {
       return this.baseUrl + UserServicesEnumNames.Login;
    }

    getGetUserUrl(): string {
       return this.baseUrl + UserServicesEnumNames.GetUser;
    }
}
