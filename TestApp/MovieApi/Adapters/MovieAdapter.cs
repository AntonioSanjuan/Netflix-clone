using MovieApi.adapters.interfaces;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Response;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieByGenresTypeModule;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieConversionType;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieGenresTypeModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MovieApi.adapters
{
    public class MovieAdapter : IMovieAdapter
    {
        public MovieAdapter() {}
        public MovieGenresResponseModelDto ToMovieGenresResponse(MovieGenresResponseModel response)
        {
            return (IsSuccessResponse(response)) ?
                MovieGenresConversionTypeModule.Success(response) :
                MovieGenresConversionTypeModule.Failure();


        }

        public MovieInfoResponseModelDto ToMovieInfoResponse(GetMovieInfoResponseModel getMovieInfoResponse, List<MovieImageResponseModel> similarImageMovies)
        {
            return (IsSuccessResponse(getMovieInfoResponse)) ?
                MovieInfoConversionTypeModule.Success(getMovieInfoResponse, similarImageMovies) :
            MovieInfoConversionTypeModule.Failure();
        }

        public TopRatedMoviesResponseModelDto ToTopRatedMoviesResponse(MoviesResponseModel getTopRatedMoviesResponse, List<MovieImageResponseModel> topRatedImageMovies)
        {
            return (IsSuccessResponse(getTopRatedMoviesResponse)) ?
                TopRatedMoviesConversionTypeModule.Success(getTopRatedMoviesResponse, topRatedImageMovies) :
            TopRatedMoviesConversionTypeModule.Failure();
        }

        public MoviesByGenreResponseModelDto ToMoviesByGenreResponse(MoviesResponseModel movieByGenres, List<MovieImageResponseModel> topRatedImageMovies)
        {
            return (IsSuccessResponse(movieByGenres)) ?
                MovieByGenresConversionTypeModule.Success(movieByGenres, topRatedImageMovies) :
            MovieByGenresConversionTypeModule.Failure();
        }

        private bool IsSuccessResponse(MovieGenresResponseModel movieGenresResponse)
        {
            return (movieGenresResponse.Status_code == (int)MoviedbStatusCodes.Success);
        }

        private bool IsSuccessResponse(MoviesResponseModel getTopRatedMoviesResponse)
        {
            return (getTopRatedMoviesResponse.Errors == null && getTopRatedMoviesResponse.Status_code == (int)MoviedbStatusCodes.Success);
        }
        private bool IsSuccessResponse(GetMovieInfoResponseModel getMovieInfoResponse)
        {
            return (getMovieInfoResponse.Status_code == (int)MoviedbStatusCodes.Success);
        }


        public MovieInfoResponseModelDto ToMovieInfoErrorResponse()
        {
            return MovieInfoConversionTypeModule.Failure();
        }
        public TopRatedMoviesResponseModelDto ToTopRatedMoviesErrorResponse()
        {
            return TopRatedMoviesConversionTypeModule.Failure();
        }
        public MoviesByGenreResponseModelDto ToMoviesByGenreErrorResponse()
        {
            return MovieByGenresConversionTypeModule.Failure();
        }
        public MovieGenresResponseModelDto ToMovieGenresErrorResponse()
        {
            return MovieGenresConversionTypeModule.Failure();
        }

        public string ToBase64MovieImage(Byte[] bytes, string imageUrl)
        {
            string imageFormat = imageUrl.Split(".").Last();

            StringBuilder _sb = new StringBuilder();
            _sb.Append(Convert.ToBase64String(bytes, 0, bytes.Length));

            return $"data:image/{imageFormat};base64,{_sb.ToString()}";
        }
    }
}
