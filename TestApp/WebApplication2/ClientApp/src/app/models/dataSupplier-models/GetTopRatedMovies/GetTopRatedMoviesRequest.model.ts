export interface IGetTopRatedMoviesRequest {
  language: string;
  page: number;
  region: string;
}

export class GetTopRatedMoviesRequestDto implements IGetTopRatedMoviesRequest {
  language: string;
  page: number;
  region: string;

  constructor(language: string, page: number, region?: string) {
    this.language = language;
    this.page = page;
    this.region = region;
  }
}
