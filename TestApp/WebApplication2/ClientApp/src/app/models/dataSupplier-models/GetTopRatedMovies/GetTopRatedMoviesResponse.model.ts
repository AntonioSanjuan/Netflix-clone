import { ICommonResponse } from '../../common/commonResponse.model';
import { Movie } from '../Common/Movie.model';

export interface IGetTopRatedMoviesResponseDto extends ICommonResponse<IGetTopRatedMoviesResponseContent> {}

export interface IGetTopRatedMoviesResponseContent {
  page: number;
  movies: Movie[];
  total_results: number;
  total_pages: number;
}
