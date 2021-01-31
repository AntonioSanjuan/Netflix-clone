using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.services;
using NUnit.Framework;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace MovieApiTest.Services
{

    public class UserServiceTest
    {
        Mock<IUserAdapter> _mockUserAdapter;
        HttpClient _mockHttpClient;
        Mock<HttpMessageHandler> _mockHttpMessageHandler;
        Mock<IOptions<TheMoviedbSettingsModel>> _theMovieSettings;


        CreateRequestTokenResponseModel _createRequestTokenResponse;
        LoginResponseModel _loginResponse;
        TheMoviedbSettingsModel _theMovieSettingsResponse;
        HttpResponseMessage _httpMessageResponse;

        UserService _service;
        private void MockService()
        {

            HttpResponseMessage toLoginRequest = null;
            HttpResponseMessage toRequestTokenRequest = null;

            //mock userAdapter
            _mockUserAdapter.Setup(repo => repo.ToLoginResponse(toLoginRequest))
                .ReturnsAsync(_loginResponse);
            _mockUserAdapter.Setup(repo => repo.ToRequestTokenResponse(toRequestTokenRequest))
                .ReturnsAsync(_createRequestTokenResponse);

            _mockHttpMessageHandler.Protected()
               .Setup<Task<HttpResponseMessage>>(
                  "SendAsync",
                  ItExpr.IsAny<HttpRequestMessage>(),
                  ItExpr.IsAny<CancellationToken>())
               .ReturnsAsync(_httpMessageResponse);

            _mockHttpClient = new HttpClient(_mockHttpMessageHandler.Object);
            _theMovieSettings.Setup(repo => repo.Value)
                .Returns(() => _theMovieSettingsResponse);
            _service = new UserService(_mockHttpClient, _mockUserAdapter.Object, _theMovieSettings.Object);
        }

        [SetUp]
        public void Setup()
        {
            //dependencies (mock) + spy
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _mockUserAdapter = new Mock<IUserAdapter>();
            _theMovieSettings = new Mock<IOptions<TheMoviedbSettingsModel>>();

            _createRequestTokenResponse = new CreateRequestTokenResponseModel();
            _loginResponse = new LoginResponseModel();
            _theMovieSettingsResponse = new TheMoviedbSettingsModel();
            _httpMessageResponse = new HttpResponseMessage();

            MockService();
        }

        [Test]
        public async Task LoginWithInvalidUrl()
        {
            LoginRequestModelDto loginRequest = new LoginRequestModelDto
            {
                user = "",
                pass = ""
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
                            createRequestToken = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();
            await _service.Login(loginRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.IsAny<HttpRequestMessage>(),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockUserAdapter.Verify(ToLoginResponseSpy => ToLoginResponseSpy.ToLoginResponse(_httpMessageResponse), Times.Never());
        }

        [Test]
        public async Task LoginWithValidUrl()
        {
            LoginRequestModelDto loginRequest = new LoginRequestModelDto
            {
                user = "",
                pass = ""
            };

            const string baseUrl = "http://baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl.com/";
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
                            createRequestToken = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();
            await _service.Login(loginRequest);

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri
                                                ),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockUserAdapter.Verify(ToLoginResponseSpy => ToLoginResponseSpy.ToLoginResponse(_httpMessageResponse), Times.Once());
        }

        [Test]
        public async Task CreateRequestTokenWithInvalidUri()
        {
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
                            createRequestToken = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();

            await _service.CreateRequestToken();

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(0),
               ItExpr.IsAny<HttpRequestMessage>(),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockUserAdapter.Verify(ToLoginResponseSpy => ToLoginResponseSpy.ToRequestTokenResponse(_httpMessageResponse), Times.Never());
        }

        [Test]
        public async Task CreateRequestTokenWithValidUri()
        {
            const string baseUrl = "http://baseUrl";
            const string apiKey = "apiKey";
            const string subUrl = "subUrl.com/";
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
                            createRequestToken = subUrl
                        }
                    }
                }
            };
            _theMovieSettingsResponse = theMovieSettingsWithInvalidUri;
            MockService();

            await _service.CreateRequestToken();

            //assert
            _mockHttpMessageHandler.Protected().Verify(
               "SendAsync",
               Times.Exactly(1),
               ItExpr.Is<HttpRequestMessage>(req => req.Method == HttpMethod.Get &&
                                                    req.RequestUri.IsAbsoluteUri &&
                                                    req.RequestUri.AbsoluteUri.Contains(new Uri($"{baseUrl}{subUrl}").ToString())
                                                ),
               ItExpr.IsAny<CancellationToken>()
            );

            _mockUserAdapter.Verify(ToLoginResponseSpy => ToLoginResponseSpy.ToRequestTokenResponse(_httpMessageResponse), Times.Once());
        }
    }
}
