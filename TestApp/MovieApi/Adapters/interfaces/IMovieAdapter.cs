using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Response;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieApi.adapters.interfaces
{
    public interface IMovieAdapter
    {
        TopRatedMoviesResponseModelDto ToTopRatedMoviesResponse(MoviesResponseModel response, List<MovieImageResponseModel> topRatedImageMovies);
        MovieInfoResponseModelDto ToMovieInfoResponse(GetMovieInfoResponseModel getMovieInfoResponse, List<MovieImageResponseModel> similarImageMovies);
        MovieGenresResponseModelDto ToMovieGenresResponse(MovieGenresResponseModel response);
        MoviesByGenreResponseModelDto ToMoviesByGenreResponse(MoviesResponseModel response, List<MovieImageResponseModel> topRatedImageMovies);

        TopRatedMoviesResponseModelDto ToTopRatedMoviesErrorResponse();
        MoviesByGenreResponseModelDto ToMoviesByGenreErrorResponse();
        MovieInfoResponseModelDto ToMovieInfoErrorResponse();
        MovieGenresResponseModelDto ToMovieGenresErrorResponse();


        string ToBase64MovieImage(Byte[] bytes, string imageUrl);
    }
}
