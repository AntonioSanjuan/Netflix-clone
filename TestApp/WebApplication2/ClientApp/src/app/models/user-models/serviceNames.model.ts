 enum UserServicesEnumNames{
    Login = 'Login',
    GetUser = 'GetUser'
}

 export class UserServicesNames{
     protected baseUrl: string;

     constructor(baseUrl: string){
        this.baseUrl = baseUrl;
     }

     getLoginUrl(): string{
        return this.baseUrl + UserServicesEnumNames.Login;
     }

     getGetUserUrl(): string{
        return this.baseUrl + UserServicesEnumNames.GetUser;
     }
}
