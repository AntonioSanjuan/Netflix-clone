using MovieApi.Models.Common;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetMovieInfo.Request
{
    public class MovieInfoResponseModelDto : CommonResponseModel<MovieInfoResponseContent> { }
    
    public class MovieInfoResponseContent
    {


        public int MovieId { get; set; }
        public string ImdbId { get; set; }
        public string Homepage { get; set; }
        public List<MovieInfoGenres> Genres { get; set; }
        public string ReleaseDate { get; set; }
        public List<MovieInfoVideos> Videos { get; set; }
    }
    public class MovieInfoGenres
    {
        public int Id { get; set; }
        public string Name { get; set; }
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
