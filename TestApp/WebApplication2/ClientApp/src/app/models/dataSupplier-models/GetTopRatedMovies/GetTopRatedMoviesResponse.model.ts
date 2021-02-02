import { ICommonResponse } from '../../common/commonResponse.model';

export interface IGetTopRatedMoviesResponseDto extends ICommonResponse<IGetTopRatedMoviesResponseContent> {}

export interface IGetTopRatedMoviesResponseContent {
  page: number;
  movies: TopRatedMovie[];
  total_results: number;
  total_pages: number;
}

export interface TopRatedMovie {
  images: TopRatedImages;
  overview: string;
  releaseDate: string;
  movieId: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  popularity: number;
  voteCount: number;
  voteAverage: number;
}

export interface TopRatedImages {
  movieId: number;
  posterImageToBase64: string;
  backdropImageToBase64: string;
}
