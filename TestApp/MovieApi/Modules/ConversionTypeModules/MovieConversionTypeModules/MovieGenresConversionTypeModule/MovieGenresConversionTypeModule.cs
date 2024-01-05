using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Movie;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieConversionType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieGenresTypeModule
{
    public class MovieGenresConversionTypeModule
    {
        public static MovieGenresResponseModelDto Failure()
        {
            MovieGenresResponseModelDto output = new MovieGenresResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMovieGenres),
                Content = new MovieGenresResponseContent()
                {
                    Genres = null
                }
            };
            return output;
        }

        public static MovieGenresResponseModelDto Success(MovieGenresResponseModel movieGenresResponseModel)
        {
            MovieGenresResponseModelDto output = new MovieGenresResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMovieGenres),
                Content = new MovieGenresResponseContent()
                {
                    Genres = MovieInfoConversionTypeModule.ConverGenres(movieGenresResponseModel.genres)
                }
            };
            return output;
        }
    }
}
