export interface ILoginRequest{
    user: string;
    pass: string;
}

export class LoginRequest implements ILoginRequest {
    constructor(user: string, pass: string){
        this.user = user;
        this.pass = pass;
    }

    public user: string;
    public pass: string;
}