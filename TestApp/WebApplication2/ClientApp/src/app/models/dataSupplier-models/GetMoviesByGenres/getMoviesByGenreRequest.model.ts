export interface IMoviesByGenreRequestDto {
  language: string;
  page: number;
  region: string;
  genre: string;}

export class MoviesByGenreRequestDto implements IMoviesByGenreRequestDto {
  language: string;
  page: number;
  region: string;
  genre: string;

  constructor(language: string, page: number, genre: string, region?: string) {
    this.language = language;
    this.page = page;
    this.region = region;
    this.genre = genre;
  }
}
