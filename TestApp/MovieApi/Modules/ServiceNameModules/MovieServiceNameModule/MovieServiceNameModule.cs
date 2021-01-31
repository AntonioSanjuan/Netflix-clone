using MovieApi.Models.AppSettings;
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
    }
}
