using MovieApi.Models.Movie.GetMovieImages.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Dtos.Movie.Common.MoviesResponse
{

    //provisional
    public class MoviesResponseContent
    {
        public int Page { get; set; }
        public List<MoviesResponseContentMovies> Movies { get; set; }
        public int Total_results { get; set; }
        public int Total_pages { get; set; }
    }

    public class MoviesResponseContentMovies
    {
        public MovieImageResponseModel Images { get; set; }
        public string Overview { get; set; }
        public string ReleaseDate { get; set; }
        public int MovieId { get; set; }
        public string OriginalTitle { get; set; }
        public string OriginalLanguage { get; set; }
        public string Title { get; set; }
        public double Popularity { get; set; }
        public int VoteCount { get; set; }
        public double VoteAverage { get; set; }

    }
}
