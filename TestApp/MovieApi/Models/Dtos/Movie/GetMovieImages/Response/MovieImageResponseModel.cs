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
            PosterImageToBase64 = base64PosterImage;
            BackdropImageToBase64 = base64BackdropImage;
        }

        public int MovieId { get; set; }
        public string PosterImageToBase64 { get; set; }
        public string BackdropImageToBase64 { get; set; }
    }
}
