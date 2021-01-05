using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetTopTatedMovies.Request
{
    public class TopRatedMoviesRequestModel
    {
        public string Language { get; set; }
        public int Page { get; set; }
        public string Region { get; set; }
    }
}
