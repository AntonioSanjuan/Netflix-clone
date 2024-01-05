export interface IGetMovieInfoRequest {
  language: string;
  movieId: number;
}

export class GetMovieInfoRequestDto implements IGetMovieInfoRequest {
  language: string;
  movieId: number;

  constructor(language: string, movieId?: number) {
    this.language = language;
    this.movieId = movieId;
  }
}
