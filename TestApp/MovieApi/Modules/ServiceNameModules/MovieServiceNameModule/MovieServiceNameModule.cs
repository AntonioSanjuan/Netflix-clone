using MovieApi.Models.AppSettings;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Request;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Request;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ServiceNameModules.MovieServiceNameModule
{
    public class MovieServiceNameModule
    {
        TheMoviedbSettingsModel _theMoviedbSettings;
        public MovieServiceNameModule(TheMoviedbSettingsModel theMoviedbSettings)
        {
            _theMoviedbSettings = theMoviedbSettings;
        }

        public string CreateMovieImageUrl(string subUrl)
        {
            string output = string.Empty;
            if (!string.IsNullOrEmpty(subUrl))
            {
                var v3Settings = _theMoviedbSettings.Version.V3;
                output = v3Settings.ImageBaseUrl + subUrl;
            }
            return output;
        }

        public string CreateTopRatedMoviesUrl(TopRatedMoviesRequestModelDto request)
        {
            var v3Settings = _theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.getTopRatedMovies;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            output = output.Replace("<<language>>", request.language);
            output = output.Replace("<<page>>", request.page.ToString());
            return output;
        }

        public string CreateMovieInfoUrl(GetMovieInfoRequestModelDto request)
        {
            var v3Settings = _theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.getMovieInfo;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            output = output.Replace("<<language>>", request.language);
            output = output.Replace("<<movie_id>>", request.movieId.ToString());
            return output;
        }

        public string CreateMoviesByGenresUrl(MoviesByGenreRequestModelDto request)
        {
            var v3Settings = _theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.getMoviesByGenre;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            output = output.Replace("<<language>>", request.language);
            output = output.Replace("<<page>>", request.page.ToString());
            output = output.Replace("<<with_genres>>", request.genre.ToString());

            
            return output;
        }
        public string CreateMovieGenresUrl(MovieGenresRequestModelDto request)
        {
            var v3Settings = _theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.getMovieGenres;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            output = output.Replace("<<language>>", request.language);

            return output;
        }
    }
}
