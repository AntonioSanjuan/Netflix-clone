using MovieApi.adapters.interfaces;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieInfoConversionTypeModule;
using MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.TopRatedMoviesConversionTypeModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MovieApi.adapters
{
    public class MovieAdapter : IMovieAdapter
    {
        public MovieAdapter() {}

        public MovieInfoResponseModelDto ToMovieInfoResponse(GetMovieInfoResponseModel getMovieInfoResponse)
        {
            return (IsSuccessResponse(getMovieInfoResponse)) ?
                MovieInfoConversionTypeModule.Success(getMovieInfoResponse) :
            MovieInfoConversionTypeModule.Failure();
        }

        public TopRatedMoviesResponseModelDto ToTopRatedMoviesResponse(GetTopRatedMoviesResponseModel getTopRatedMoviesResponse, List<MovieImageResponseModel> topRatedImageMovies)
        {
            return (IsSuccessResponse(getTopRatedMoviesResponse)) ?
                TopRatedMoviesConversionTypeModule.Success(getTopRatedMoviesResponse, topRatedImageMovies) :
            TopRatedMoviesConversionTypeModule.Failure();
        }

        private bool IsSuccessResponse(GetTopRatedMoviesResponseModel getTopRatedMoviesResponse)
        {
            return (getTopRatedMoviesResponse.Errors == null && getTopRatedMoviesResponse.Status_code == (int)MoviedbStatusCodes.Success);
        }
        private bool IsSuccessResponse(GetMovieInfoResponseModel getMovieInfoResponse)
        {
            return (getMovieInfoResponse.Status_code == (int)MoviedbStatusCodes.Success);
        }


        public MovieInfoResponseModelDto ToMovieInfoErrorResponse()
        {
            return MovieInfoConversionTypeModule.Failure();
        }
        public TopRatedMoviesResponseModelDto ToTopRatedMoviesErrorResponse()
        {
            return TopRatedMoviesConversionTypeModule.Failure();
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
