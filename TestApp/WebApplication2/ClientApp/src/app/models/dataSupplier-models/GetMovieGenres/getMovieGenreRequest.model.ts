export interface IMovieGenresRequest {
  language: string;
}

export class MovieGenresRequestDto implements IMovieGenresRequest {
  language: string;

  constructor(language: string) {
    this.language = language;
  }
}
