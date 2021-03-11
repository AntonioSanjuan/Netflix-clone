import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';
import { IGetTopRatedMoviesResponseDto } from 'src/app/models/dataSupplier-models/GetTopRatedMovies/getTopRatedMoviesResponse.model';
import { ILoginResponse } from 'src/app/models/user-models/Login/LoginResponse.model';

export class ResponseValidator {
    public isLoginResponseValid(loginResponse: ILoginResponse): boolean {
        try {
            return (loginResponse && loginResponse.content && loginResponse.content.isValid);
        } catch {
            return false;
        }
    }

    public isGetTopRatedMoviesResponseValid(topRatedResponse: IGetTopRatedMoviesResponseDto): boolean {
      try {
          return (topRatedResponse && topRatedResponse.content && topRatedResponse.content.movies !== undefined);
      } catch {
          return false;
      }
    }

    public isGetMovieInfoResponseValid(movieInfoResponse: IGetMovieInfoResponseDto): boolean {
        try{
            return (movieInfoResponse && movieInfoResponse.content && movieInfoResponse.content.movieId !== 0);
        } catch {
          return false;
      }
    }
}
