import { ICommonResponse } from "../../common/commonResponse.model";
import { IMoviesResponseContent } from "../Common/MovieResponse.model";

export interface IGetMoviesByGenreResponseDto extends ICommonResponse<IMoviesResponseContent> {}
