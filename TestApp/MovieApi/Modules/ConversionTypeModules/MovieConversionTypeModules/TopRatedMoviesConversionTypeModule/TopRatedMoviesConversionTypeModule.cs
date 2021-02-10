using MovieApi.Models.Movie;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System.Collections.Generic;
using System.Linq;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.TopRatedMoviesConversionTypeModule
{
    public static class TopRatedMoviesConversionTypeModule
    {
        public static TopRatedMoviesResponseModelDto Failure()
        {
            TopRatedMoviesResponseModelDto output = new TopRatedMoviesResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetTopRatedMovies),
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

        public static TopRatedMoviesResponseModelDto Success(GetTopRatedMoviesResponseModel topRatedMoviesResponseModel, List<MovieImageResponseModel> topRatedImageMovies)
        {
            TopRatedMoviesResponseModelDto output = new TopRatedMoviesResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetTopRatedMovies),
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

        private static List<TopRatedMoviesResponseContentMovies> ConvertTopRatedMovies(List<GetTopRatedMovie> input, List<MovieImageResponseModel> inputImages)
        {
            List<TopRatedMoviesResponseContentMovies> output = new List<TopRatedMoviesResponseContentMovies>();
            foreach(GetTopRatedMovie singleInput in input)
            {
                MovieImageResponseModel singleImage = inputImages.Where(movie => movie.MovieId == singleInput.Id).FirstOrDefault();
                output.Add(new TopRatedMoviesResponseContentMovies()
                {
                    MovieId = singleInput.Id,
                    Images = singleImage,
                    VoteAverage = singleInput.Vote_average,
                    OriginalLanguage = singleInput.Original_language,
                    OriginalTitle = singleInput.Original_title,
                    Overview = singleInput.Overview,
                    Popularity = singleInput.Popularity,
                    ReleaseDate = singleInput.Release_date,
                    Title = singleInput.Title,
                    VoteCount = singleInput.Vote_count,
                });
            }
            return output;
        }
    }
}
