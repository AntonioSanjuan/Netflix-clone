using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.services;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace MovieApiTest.Services
{
    public class MovieServiceTest
    {
        Mock<IMovieAdapter> _mockMovieAdapter;
        HttpClient _mockHttpClient;
        Mock<HttpMessageHandler> _mockHttpMessageHandler;
        Mock<IOptions<TheMoviedbSettingsModel>> _theMovieSettings;


        TopRatedMoviesResponseModel _topRatedMoviesResponse;
        string _toBase64MovieImageResponse;
        TheMoviedbSettingsModel _theMovieSettingsResponse;
        HttpResponseMessage _httpMessageResponse;

        MovieService _service;
        private void MockService()
        {
            GetTopRatedMoviesResponseModel getTopRatedMoviesResponseRequestParam = null;
            List<MovieImageResponseModel> topRatedImageMovieRequestParam = null;
            Byte[] toBase64MovieImageRequestParam = null;
            string toBase64MovieImageimageUrlRequestParam = null;
            _mockMovieAdapter.Setup(repo => repo.ToTopRatedMoviesResponse(getTopRatedMoviesResponseRequestParam, topRatedImageMovieRequestParam))
                .Returns(_topRatedMoviesResponse);
            _mockMovieAdapter.Setup(repo => repo.ToBase64MovieImage(toBase64MovieImageRequestParam, toBase64MovieImageimageUrlRequestParam))
                .Returns(_toBase64MovieImageResponse);

            _mockHttpMessageHandler.Protected()
               .Setup<Task<HttpResponseMessage>>(
                  "SendAsync",
                  ItExpr.IsAny<HttpRequestMessage>(),
                  ItExpr.IsAny<CancellationToken>())
               .ReturnsAsync(_httpMessageResponse);

            _mockHttpClient = new HttpClient(_mockHttpMessageHandler.Object);
            _theMovieSettings.Setup(repo => repo.Value)
                .Returns(() => _theMovieSettingsResponse);
            _service = new MovieService(_mockHttpClient, _mockMovieAdapter.Object, _theMovieSettings.Object);
        }

        [SetUp]
        public void Setup()
        {
            //dependencies (mock) + spy
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _mockMovieAdapter = new Mock<IMovieAdapter>();
            _theMovieSettings = new Mock<IOptions<TheMoviedbSettingsModel>>();

            _topRatedMoviesResponse = new TopRatedMoviesResponseModel();
            _toBase64MovieImageResponse = string.Empty;
            _theMovieSettingsResponse = new TheMoviedbSettingsModel();
            _httpMessageResponse = new HttpResponseMessage();

            MockService();
        }

        [Test]
        public async Task GetTopRatedMoviesWithInvalidUri()
        {
            TopRatedMoviesRequestModelDto getTopRatedMoviesRequest = new TopRatedMoviesRequestModelDto()
            {
                page = 1,
                language = "DE"
            };
            const string baseUrl = "baseUrl";
            const string imageBaseUrl = "imageBaseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ImageBaseUrl = imageBaseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getTopRatedMovies = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();
            var actual = await _service.GetTopRatedMovies(getTopRatedMoviesRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.IsAny<HttpRequestMessage>(),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesResponse(null, null), Times.Never());

        }

        [Test]
        public async Task GetTopRatedMoviesWithValidUri()
        {
            TopRatedMoviesRequestModelDto getTopRatedMoviesRequest = new TopRatedMoviesRequestModelDto()
            {
                page = 1,
                language = ""
            };
            const string baseUrl = "http://baseUrl";
            const string imageBaseUrl = "http://imageBaseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ImageBaseUrl = imageBaseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getTopRatedMovies = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();
            var actual = await _service.GetTopRatedMovies(getTopRatedMoviesRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesResponse(null, null), Times.Never());

        }
    }
}
