using MovieApi.adapters.interfaces;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.TopRatedMoviesConversionTypeModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MovieApi.adapters
{
    public class MovieAdapter : IMovieAdapter
    {
        public MovieAdapter() {}

        public TopRatedMoviesResponseModel ToTopRatedMoviesResponse(GetTopRatedMoviesResponseModel getTopRatedMoviesResponse, List<MovieImageResponseModel> topRatedImageMovies)
        {
            return (getTopRatedMoviesResponse.Status_code == (int)MoviedbStatusCodes.Success) ?
                TopRatedMoviesConversionTypeModule.Success(getTopRatedMoviesResponse, topRatedImageMovies) :
            TopRatedMoviesConversionTypeModule.Failure();
        }
        public string ToBase64MovieImage(Byte[] bytes, string imageUrl)
        {
            string imageFormat = imageUrl.Split(".").Last();

            StringBuilder _sb = new StringBuilder();
            _sb.Append(Convert.ToBase64String(bytes, 0, bytes.Length));

            return $"data:image/{imageFormat};base64,{_sb.ToString()}";
        }
    }
}
