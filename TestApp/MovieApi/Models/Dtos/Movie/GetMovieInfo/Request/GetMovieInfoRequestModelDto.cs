using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetMovieInfo.Request
{
    public class GetMovieInfoRequestModelDto
    {
        public string language { get; set; }
        public int movieId { get; set; }
    }
}
