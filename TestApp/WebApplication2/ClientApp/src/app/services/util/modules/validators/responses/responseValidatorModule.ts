import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/GetTopRatedMoviesResponse.model';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';

export class ResponseValidator {
    public isLoginResponseValid(loginResponse: ILoginResponse): boolean {
        try {
            return (loginResponse && loginResponse.content && loginResponse.content.isValid);
        } catch {
            return false;
        }
    }

    public isGetTopRatedMoviesResponseValid(loginResponse: IGetTopRatedMoviesResponseDto): boolean {
      try {
          return (loginResponse && loginResponse.content && loginResponse.content.movies !== undefined);
      } catch {
          return false;
      }
  }
}
