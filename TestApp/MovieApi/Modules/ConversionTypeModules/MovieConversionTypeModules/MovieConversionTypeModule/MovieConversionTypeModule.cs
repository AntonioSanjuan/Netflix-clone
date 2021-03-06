using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System.Collections.Generic;
using System.Linq;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieConversionType
{
    public static class MovieConversionTypeModule
    {
        public static List<TopRatedMoviesResponseContentMovies> ConvertMovies(List<GetTopRatedMovie> input, List<MovieImageResponseModel> inputImages)
        {
            List<TopRatedMoviesResponseContentMovies> output = new List<TopRatedMoviesResponseContentMovies>();
            foreach (GetTopRatedMovie singleInput in input)
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
