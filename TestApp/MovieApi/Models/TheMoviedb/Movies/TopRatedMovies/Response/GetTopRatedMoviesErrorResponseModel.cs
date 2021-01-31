using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response
{
    public class GetTopRatedMoviesErrorResponseModel : CreateRequestTokenErrorResponseModel
    {
        public List<string> Errors { get; set; }
        public bool Success { get; set; }
    }
}
