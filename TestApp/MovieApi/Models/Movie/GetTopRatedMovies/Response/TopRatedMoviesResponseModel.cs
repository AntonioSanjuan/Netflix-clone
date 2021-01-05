using MovieApi.Models.Common;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetTopTatedMovies.Response
{
    public class TopRatedMoviesResponseModel : CommonResponseModel<TopRatedMoviesResponseContent> { }

    //provisional
    public class TopRatedMoviesResponseContent
    {
        public int Page { get; set; }
        public List<TopRatedMoviesResponseContentMovies> Movies { get; set; }
        public int Total_results { get; set; }
        public int Total_pages { get; set; }
    }

    public class TopRatedMoviesResponseContentMovies
    {
        public MovieImageResponseModel Images { get; set; }
        public string Overview { get; set; }
        public string Release_date { get; set; }
        public int Id { get; set; }
        public string Original_title { get; set; }
        public string Original_language { get; set; }
        public string Title { get; set; }
        public double Popularity { get; set; }
        public int Vote_count { get; set; }
        public double Vote_average { get; set; }

    }
}
