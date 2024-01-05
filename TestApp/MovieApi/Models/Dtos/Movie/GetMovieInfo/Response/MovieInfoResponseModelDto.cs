using MovieApi.Models.Common;
using MovieApi.Models.Dtos.Movie.Common.MoviesResponse;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using System.Collections.Generic;

namespace MovieApi.Models.Movie.GetMovieInfo.Request
{
    public class MovieInfoResponseModelDto : CommonResponseModel<MovieInfoResponseContent> { }
    
    public class MovieInfoResponseContent
    {


        public int MovieId { get; set; }
        public string ImdbId { get; set; }
        public string Homepage { get; set; }
        public List<GenreDto> Genres { get; set; }
        public string ReleaseDate { get; set; }
        public List<MovieInfoVideos> Videos { get; set; }
        public List<MoviesResponseContentMovies> Similar { get; set; }
    }

    public class MovieInfoVideos
    {
        public string VideoId { get; set; }
        public string VideoKey { get; set; }
        public string Site { get; set; }
        public int Size { get; set; }
        public string VideoType { get; set; }
    }


}
