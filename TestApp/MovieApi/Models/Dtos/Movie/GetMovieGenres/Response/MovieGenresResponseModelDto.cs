using MovieApi.Models.Common;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Dtos.Movie.GetMovieGenres.Response
{
    public class MovieGenresResponseModelDto : CommonResponseModel<MovieGenresResponseContent> { }

    public class MovieGenresResponseContent
    {
        public List<GenreDto> Genres { get; set; }
    }

    public class GenreDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
