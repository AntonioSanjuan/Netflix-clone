using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Movie.GetMovieImages.Response
{
    public class MovieImageResponseModel
    {
        public MovieImageResponseModel(int id, string base64PosterImage, string base64BackdropImage)
        {
            MovieId = id;
            Base64PosterImage = base64PosterImage;
            Base64BackdropImage = base64BackdropImage;
        }

        public int MovieId { get; set; }
        public string Base64PosterImage { get; set; }
        public string Base64BackdropImage { get; set; }
    }
}
