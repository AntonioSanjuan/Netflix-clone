export interface IMoviesByGenreRequestDto {
  language: string;
  page: number;
  region: string;
  genre: number;
}

export class MoviesByGenreRequestDto implements IMoviesByGenreRequestDto {
  language: string;
  page: number;
  region: string;
  genre: number;

  constructor(language: string, page: number, genre: number, region?: string) {
    this.language = language;
    this.page = page;
    this.region = region;
    this.genre = genre;
  }
}
