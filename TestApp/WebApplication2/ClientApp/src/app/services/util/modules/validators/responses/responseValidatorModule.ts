import { ILoginResponse } from "src/app/models/user-models/Login/LoginResponse.model";

export class ResponseValidator{
    public isLoginResponseValid(loginResponse: ILoginResponse): boolean{
        try{
            return (loginResponse && loginResponse.content && loginResponse.content.isValid);
        }catch{
            return false;
        }
    }
}