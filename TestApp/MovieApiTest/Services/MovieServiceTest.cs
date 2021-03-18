using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Request;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Request;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Response;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.services;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
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

        MoviesByGenreResponseModelDto _moviesByGenresResponse;
        MovieGenresResponseModelDto _movieGenresResponse;
        TopRatedMoviesResponseModelDto _topRatedMoviesResponse;
        string _toBase64MovieImageResponse;
        TheMoviedbSettingsModel _theMovieSettingsResponse;
        HttpResponseMessage _httpMessageResponse;

        MovieService _service;

        private void MockService()
        {
            MovieGenresResponseModel getMovieGenres = null;
            MoviesResponseModel moviesResponseRequestParam = null;
            List<MovieImageResponseModel> imageMovieRequestParam = null;
            Byte[] toBase64MovieImageRequestParam = null;
            string toBase64MovieImageimageUrlRequestParam = null;

            _mockMovieAdapter.Setup(repo => repo.ToMoviesByGenreResponse(moviesResponseRequestParam, imageMovieRequestParam))
                    .Returns(_moviesByGenresResponse);
            _mockMovieAdapter.Setup(repo => repo.ToMovieGenresResponse(getMovieGenres))
                .Returns(_movieGenresResponse);
            _mockMovieAdapter.Setup(repo => repo.ToTopRatedMoviesResponse(moviesResponseRequestParam, imageMovieRequestParam))
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

            _movieGenresResponse = new MovieGenresResponseModelDto();
            _topRatedMoviesResponse = new TopRatedMoviesResponseModelDto();
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

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesResponse(It.IsAny<MoviesResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Never());
            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesErrorResponse(), Times.Once());

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

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesResponse(It.IsAny<MoviesResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Never());
            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToTopRatedMoviesErrorResponse(), Times.Once());


        }

        [Test]
        public async Task GetMoviesInfoWithValidUri()
        {
            GetMovieInfoRequestModelDto getMovieInfoRequest = new GetMovieInfoRequestModelDto()
            {
                movieId = 0,
                language = ""
            };
            const string baseUrl = "http://baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMovieInfo = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;

            _httpMessageResponse = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{ \"status_code\" :0 }", Encoding.UTF8, "application/json"),
            };

            MockService();
            var actual = await _service.GetMovieInfo(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieInfoResponse(It.IsAny<GetMovieInfoResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Once());

        }

        [Test]
        public async Task GetMoviesInfoWithInvalidUri()
        {
            GetMovieInfoRequestModelDto getMovieInfoRequest = new GetMovieInfoRequestModelDto()
            {
                movieId = 0,
                language = ""
            };
            const string baseUrl = "baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMovieInfo = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();
            var actual = await _service.GetMovieInfo(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.IsAny<HttpRequestMessage>(),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieInfoResponse(It.IsAny<GetMovieInfoResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Never());
            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieInfoErrorResponse(), Times.Once());

        }

        [Test]
        public async Task GetMovieGenresInfoWithValidUri()
        {
            MovieGenresRequestModelDto getMovieInfoRequest = new MovieGenresRequestModelDto()
            {
                language = ""
            };
            const string baseUrl = "http://baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMovieGenres = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            _httpMessageResponse = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{ \"status_code\" :0 }", Encoding.UTF8, "application/json"),
            };

            MockService();
            var actual = await _service.GetMovieGenres(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieGenresResponse(It.IsAny<MovieGenresResponseModel>()), Times.Once());
        }

        [Test]
        public async Task GetMovieGenresInfoWithInvalidUri()
        {
            MovieGenresRequestModelDto getMovieInfoRequest = new MovieGenresRequestModelDto()
            {
                language = ""
            };
            const string baseUrl = "baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMovieGenres = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;

            MockService();
            var actual = await _service.GetMovieGenres(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieGenresResponse(It.IsAny<MovieGenresResponseModel>()), Times.Never());
            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMovieGenresErrorResponse(), Times.Once());
        }

        [Test]
        public async Task GetMoviesByGenreWithValidUri()
        {
            MoviesByGenreRequestModelDto getMovieInfoRequest = new MoviesByGenreRequestModelDto()
            {
                page = 1,
                genre = 1,
                region = "en-US",
                language = ""
            };
            const string baseUrl = "http://baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMoviesByGenre = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            _httpMessageResponse = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{ \"status_code\" :0 }", Encoding.UTF8, "application/json"),
            };

            MockService();
            var actual = await _service.GetMoviesByGenre(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMoviesByGenreResponse(It.IsAny<MoviesResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Once());
        }

        [Test]
        public async Task GetMoviesByGenreWithInValidUri()
        {
            MoviesByGenreRequestModelDto getMovieInfoRequest = new MoviesByGenreRequestModelDto()
            {
                page = 1,
                genre = 1,
                region = "en-US",
                language = ""
            };
            const string baseUrl = "baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl";
            var theMovieSettingsWithInvalidUri = new TheMoviedbSettingsModel()
            {
                Version = new TheMoviedbVersionSettingsModel()
                {
                    V3 = new TheMoviedbVersionSettingModel()
                    {
                        BaseUrl = baseUrl,
                        ApiKey = apiKey,
                        SubUrls = new SubUrls()
                        {
                            getMoviesByGenre = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;

            MockService();
            var actual = await _service.GetMoviesByGenre(getMovieInfoRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ), ItExpr.IsAny<CancellationToken>()
            );

            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMoviesByGenreResponse(It.IsAny<MoviesResponseModel>(), It.IsAny<List<MovieImageResponseModel>>()), Times.Never());
            _mockMovieAdapter.Verify(ToTopRatedMoviesSpy => ToTopRatedMoviesSpy.ToMoviesByGenreErrorResponse(), Times.Once());

        }
    }
}
