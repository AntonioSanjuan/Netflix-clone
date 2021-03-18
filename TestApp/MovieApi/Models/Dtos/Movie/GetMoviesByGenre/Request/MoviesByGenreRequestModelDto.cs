using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Request
{
    public class MoviesByGenreRequestModelDto
    {
        public string language { get; set; }
        public int page { get; set; }
        public string region { get; set; }
        public int genre { get; set; }

    }
}
