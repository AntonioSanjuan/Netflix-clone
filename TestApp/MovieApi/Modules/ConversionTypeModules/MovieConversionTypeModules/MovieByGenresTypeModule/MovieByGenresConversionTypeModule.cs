using MovieApi.Models.Dtos.Movie.Common.MoviesResponse;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Response;
using MovieApi.Models.Movie;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieConversionType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieByGenresTypeModule
{
    public class MovieByGenresConversionTypeModule
    {
        public static MoviesByGenreResponseModelDto Failure()
        {
            MoviesByGenreResponseModelDto output = new MoviesByGenreResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMoviesByGenre),
                Content = new MoviesResponseContent()
                {
                    Page = 1,
                    Movies = null,
                    Total_pages = 1,
                    Total_results = 0,
                }
            };
            return output;
        }

        public static MoviesByGenreResponseModelDto Success(MoviesResponseModel topRatedMoviesResponseModel, List<MovieImageResponseModel> topRatedImageMovies)
        {
            MoviesByGenreResponseModelDto output = new MoviesByGenreResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMoviesByGenre),
                Content = new MoviesResponseContent()
                {
                    Page = topRatedMoviesResponseModel.Page,
                    Movies = MovieConversionTypeModule.ConvertMovies(topRatedMoviesResponseModel.Results, topRatedImageMovies),
                    Total_pages = topRatedMoviesResponseModel.Total_pages,
                    Total_results = topRatedMoviesResponseModel.Total_results,
                }
            };
            return output;
        }
    }
}
