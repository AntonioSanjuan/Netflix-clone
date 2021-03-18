import { Movie } from "./movie.model";

export interface IMoviesResponseContent {
    page: number;
    movies: Movie[];
    total_results: number;
    total_pages: number;
  }