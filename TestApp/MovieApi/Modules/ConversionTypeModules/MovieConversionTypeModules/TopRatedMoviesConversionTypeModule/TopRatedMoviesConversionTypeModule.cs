using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System.Collections.Generic;
using System.Linq;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.TopRatedMoviesConversionTypeModule
{
    public static class TopRatedMoviesConversionTypeModule
    {
        public static TopRatedMoviesResponseModel Failure()
        {
            TopRatedMoviesResponseModel output = new TopRatedMoviesResponseModel()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(),
                Content = new TopRatedMoviesResponseContent()
                {
                    Page = 1,
                    Movies = null,
                    Total_pages = 1,
                    Total_results = 0,
                }
            };
            return output;
        }

        public static TopRatedMoviesResponseModel Success(GetTopRatedMoviesResponseModel topRatedMoviesResponseModel, List<MovieImageResponseModel> topRatedImageMovies)
        {
            TopRatedMoviesResponseModel output = new TopRatedMoviesResponseModel()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(),
                Content = new TopRatedMoviesResponseContent()
                {
                    Page = topRatedMoviesResponseModel.Page,
                    Movies = ConvertTopRatedMovies(topRatedMoviesResponseModel.Results, topRatedImageMovies),
                    Total_pages = topRatedMoviesResponseModel.Total_pages,
                    Total_results = topRatedMoviesResponseModel.Total_results,
                }
            };
            return output;
        }

        public static List<TopRatedMoviesResponseContentMovies> ConvertTopRatedMovies(List<GetTopRatedMovie> input, List<MovieImageResponseModel> inputImages)
        {
            List<TopRatedMoviesResponseContentMovies> output = new List<TopRatedMoviesResponseContentMovies>();
            foreach(GetTopRatedMovie singleInput in input)
            {
                MovieImageResponseModel singleImage = inputImages.Where(movie => movie.MovieId == singleInput.Id).FirstOrDefault();
                output.Add(new TopRatedMoviesResponseContentMovies()
                {
                    Id = singleInput.Id,
                    Images = singleImage,
                    Vote_average = singleInput.Vote_average,
                    Original_language = singleInput.Original_language,
                    Original_title = singleInput.Original_title,
                    Overview = singleInput.Overview,
                    Popularity = singleInput.Popularity,
                    Release_date = singleInput.Release_date,
                    Title = singleInput.Title,
                    Vote_count = singleInput.Vote_count,
                });
            }
            return output;
        }
    }
}
