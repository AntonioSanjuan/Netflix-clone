using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response
{
    public class GetTopRatedMoviesResponseModel : GetTopRatedMoviesErrorResponseModel
    {
        public int Page { get; set; }
        public List<GetTopRatedMovie> Results { get; set; }
        public int Total_results { get; set; }
        public int Total_pages { get; set; }
    }

    public class GetTopRatedMovie
    {
        public string Poster_path { get; set; }
        public bool Adult { get; set; }
        public string Overview { get; set; }
        public string Release_date { get; set; }
        public List<int> Genre_ids { get; set; }
        public int Id { get; set; }
        public string Original_title { get; set; }
        public string Original_language { get; set; }
        public string Title { get; set; }
        public string Backdrop_path { get; set; }
        public double Popularity { get; set; }
        public int Vote_count { get; set; }
        public bool Video { get; set; }
        public double Vote_average { get; set; }
    }
}
