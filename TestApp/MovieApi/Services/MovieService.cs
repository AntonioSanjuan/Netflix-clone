using Microsoft.Extensions.Options;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.Modules.ServiceNameModules.MovieServiceNameModule;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MovieApi.services
{
    public class MovieService : IMovieService
    {
        private readonly HttpClient _httpClient;
        private readonly IMovieAdapter _movieAdapter;
        private readonly TheMoviedbSettingsModel _theMoviedbSettings;
        private readonly MovieServiceNameModule _serviceNameModule;
        public MovieService(
            HttpClient httpClient, 
            IMovieAdapter movieAdapter,
            IOptions<TheMoviedbSettingsModel> theMoviedbSettings)
        {
            _httpClient = httpClient;
            _movieAdapter = movieAdapter;
            _theMoviedbSettings = theMoviedbSettings.Value;

            _serviceNameModule = new MovieServiceNameModule(_theMoviedbSettings);
        }

        public async Task<TopRatedMoviesResponseModelDto> GetTopRatedMovies(TopRatedMoviesRequestModelDto request)
        {
            try
            {
                string url = _serviceNameModule.CreateTopRatedMoviesUrl(request);
                HttpResponseMessage response = _httpClient.GetAsync(url).Result;
                var responseAsString = await response.Content.ReadAsStringAsync();
                GetTopRatedMoviesResponseModel getTopRatedMoviesResponse = JsonSerializer.Deserialize<GetTopRatedMoviesResponseModel>(responseAsString, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                });
                List<MovieImageResponseModel> topRatedImageMovies = await GetTopRatedMovieImages(getTopRatedMoviesResponse);
                TopRatedMoviesResponseModelDto topRatedMoviesResponse = _movieAdapter.ToTopRatedMoviesResponse(getTopRatedMoviesResponse, topRatedImageMovies);

                return topRatedMoviesResponse;
            }
            catch (Exception)
            {
                return _movieAdapter.ToTopRatedMoviesErrorResponse();
            }
        }

        private async Task<List<MovieImageResponseModel>> GetTopRatedMovieImages(GetTopRatedMoviesResponseModel getTopRatedMovies)
        {
            try
            {
                List<MovieImageResponseModel> output = new List<MovieImageResponseModel>();

                if (getTopRatedMovies.Results != null)
                {
                    foreach (var movie in getTopRatedMovies.Results)
                    {
                        string base64BackdropImageUrl = _serviceNameModule.CreateMovieImageUrl(movie.Backdrop_path);
                        string Base64PosterImageUrl = _serviceNameModule.CreateMovieImageUrl(movie.Poster_path);
                        output.Add(new MovieImageResponseModel(
                            movie.Id,
                            string.IsNullOrEmpty(Base64PosterImageUrl) ?
                                null :
                                _movieAdapter.ToBase64MovieImage(await _httpClient.GetByteArrayAsync(Base64PosterImageUrl), Base64PosterImageUrl),
                            string.IsNullOrEmpty(base64BackdropImageUrl) ?
                                null :
                                _movieAdapter.ToBase64MovieImage(await _httpClient.GetByteArrayAsync(base64BackdropImageUrl), base64BackdropImageUrl)
                        ));
                    }
                }
                return output;
            }
            catch (Exception)
            {
                return new List<MovieImageResponseModel>();
            }
        }

        public async Task<MovieInfoResponseModelDto> GetMovieInfo(GetMovieInfoRequestModelDto request)
        {
            try
            {
                string url = _serviceNameModule.CreateMovieInfoUrl(request);
                HttpResponseMessage response = _httpClient.GetAsync(url).Result;
                var responseAsString = await response.Content.ReadAsStringAsync();
                GetMovieInfoResponseModel getMovieInfoResponse = JsonSerializer.Deserialize<GetMovieInfoResponseModel>(responseAsString, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                });
                List<MovieImageResponseModel> topRatedImageMovies = await GetTopRatedMovieImages(getMovieInfoResponse.similar);
                MovieInfoResponseModelDto topRatedMoviesResponse = _movieAdapter.ToMovieInfoResponse(getMovieInfoResponse, topRatedImageMovies);

                return topRatedMoviesResponse;
            }
            catch (Exception)
            {
                return _movieAdapter.ToMovieInfoErrorResponse();
            }
        }
    }
}
