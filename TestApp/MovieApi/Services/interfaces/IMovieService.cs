using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieApi.services.interfaces
{
    public interface IMovieService
    {
        Task<TopRatedMoviesResponseModelDto> GetTopRatedMovies(TopRatedMoviesRequestModelDto request);
        Task<MovieInfoResponseModelDto> GetMovieInfo(GetMovieInfoRequestModelDto request);

    }
}
