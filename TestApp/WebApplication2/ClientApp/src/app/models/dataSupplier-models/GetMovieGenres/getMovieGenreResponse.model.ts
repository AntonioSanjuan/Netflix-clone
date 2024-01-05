import { ICommonResponse } from "../../common/commonResponse.model";
import { MovieInfoGenres } from "../GetMovieInfo/getMovieInfoResponse.model";

export interface IGetMovieGenreResponseDto extends ICommonResponse<IGetMovieGenreResponseContent> {}

export interface IGetMovieGenreResponseContent{
    genres: MovieInfoGenres[];
}