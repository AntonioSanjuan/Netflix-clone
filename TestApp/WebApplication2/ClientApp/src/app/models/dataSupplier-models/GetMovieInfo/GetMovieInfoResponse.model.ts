import { ICommonResponse } from "../../common/commonResponse.model";
import { Movie } from "../GetTopRatedMovies/GetTopRatedMoviesResponse.model";

export interface IGetMovieInfoResponseDto extends ICommonResponse<IGetMovieInfoResponseContent> {}

export interface IGetMovieInfoResponseContent {
  movieId: number
  imdbId: string
  homepage: string
  genres: MovieInfoGenres[]
  releaseDate: string
  videos: MovieInfoVideos[]
  similar: Movie[]
}

export interface MovieInfoGenres {
  id: number
  name: string
}

export interface MovieInfoVideos {
  videoId: string
  videoKey: string
  site: string
  size: number
  videoType: string
}