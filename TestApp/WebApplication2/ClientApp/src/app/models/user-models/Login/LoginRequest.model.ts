export interface ILoginRequest {
  user: string;
  pass: string;
}

export class LoginRequest implements ILoginRequest {
  public user: string;
  public pass: string;

  constructor(user: string, pass: string) {
      this.user = user;
      this.pass = pass;
  }

}
