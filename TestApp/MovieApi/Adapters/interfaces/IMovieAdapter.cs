using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
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
        TopRatedMoviesResponseModel ToTopRatedMoviesResponse(GetTopRatedMoviesResponseModel response, List<MovieImageResponseModel> topRatedImageMovies);
        string ToBase64MovieImage(Byte[] bytes, string imageUrl);
        TopRatedMoviesResponseModel TopTopRatedMoviesErrorResponse();

    }
}
