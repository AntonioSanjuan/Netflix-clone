import { IGetMovieGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMovieGenres/getMovieGenreResponse.model';
import { IGetMovieInfoResponseDto } from 'src/app/models/dataSupplier-models/GetMovieInfo/getMovieInfoResponse.model';
import { IGetMoviesByGenreResponseDto } from 'src/app/models/dataSupplier-models/GetMoviesByGenres/getMoviesByGenreResponse.model';
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

    public isGetMovieGenresResponseValid(movieGenresResponse: IGetMovieGenreResponseDto): boolean {
        try{
            return (movieGenresResponse && movieGenresResponse.content && movieGenresResponse.content.genres !== undefined);
        } catch {
          return false;
      }
    }

    public isGetMoviesByGenreResponseValid(moviesByGenreResponse: IGetMoviesByGenreResponseDto): boolean {
        try{
            return (moviesByGenreResponse && moviesByGenreResponse.content && moviesByGenreResponse.content.movies !== undefined);
        } catch {
          return false;
      }
    }
    
}
