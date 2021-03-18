import { ICommonResponse } from '../../common/commonResponse.model';
import { Movie } from '../Common/movie.model';
import { IMoviesResponseContent } from '../Common/MovieResponse.model';

export interface IGetTopRatedMoviesResponseDto extends ICommonResponse<IMoviesResponseContent> {}


