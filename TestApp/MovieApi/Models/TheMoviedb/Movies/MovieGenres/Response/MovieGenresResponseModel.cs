using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response
{
    public class MovieGenresResponseModel : MovieGenresErrorResponseModel
    {
        public List<Genre> genres { get; set; }
    }

}
