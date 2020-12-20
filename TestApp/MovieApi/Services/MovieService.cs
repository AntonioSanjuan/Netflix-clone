using MovieApi.adapters.interfaces;
using MovieApi.services.interfaces;
using System.Net.Http;

namespace MovieApi.services
{
    public class MovieService : IMovieService
    {
        private readonly HttpClient _httpClient;
        private readonly IMovieAdapter _movieAdapter;

        public MovieService(HttpClient httpClient, IMovieAdapter movieAdapter)
        {
            _httpClient = httpClient;
            _movieAdapter = movieAdapter;
        }
    }
}
