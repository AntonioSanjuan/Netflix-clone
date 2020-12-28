using Microsoft.Extensions.Options;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.services.interfaces;
using System.Net.Http;

namespace MovieApi.services
{
    public class MovieService : IMovieService
    {
        private readonly HttpClient _httpClient;
        private readonly IMovieAdapter _movieAdapter;
        private readonly TheMoviedbSettingsModel _theMoviedbSettings;
        public MovieService(
            HttpClient httpClient, 
            IMovieAdapter movieAdapter,
            IOptions<TheMoviedbSettingsModel> theMoviedbSettings)
        {
            _httpClient = httpClient;
            _movieAdapter = movieAdapter;
            _theMoviedbSettings = theMoviedbSettings.Value;
        }
    }
}
