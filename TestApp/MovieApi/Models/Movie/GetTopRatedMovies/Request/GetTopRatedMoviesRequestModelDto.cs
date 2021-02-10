using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetTopTatedMovies.Request
{
    public class TopRatedMoviesRequestModelDto
    {
        public string language { get; set; }
        public int page { get; set; }
        public string region { get; set; }
    }
}
