using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieApi.services.interfaces
{
    public interface IMovieService
    {
        Task<TopRatedMoviesResponseModel> GetTopRatedMovies(TopRatedMoviesRequestModel request);
    }
}
