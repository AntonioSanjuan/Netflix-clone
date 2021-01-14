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


        CreateRequestTokenResponseModel _createRequestTokenResponse = new CreateRequestTokenResponseModel();
        LoginResponseModel _loginResponse = new LoginResponseModel();
        TheMoviedbSettingsModel _theMovieSettingsResponse = new TheMoviedbSettingsModel();
        HttpResponseMessage _httpMessageResponse = new HttpResponseMessage();

        UserService _service;

        [SetUp]
        public void Setup()
        {
            //dependencies (mock) + spy
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _mockUserAdapter = new Mock<IUserAdapter>();
            _theMovieSettings = new Mock<IOptions<TheMoviedbSettingsModel>>();

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
                .Returns(_theMovieSettingsResponse);
            _service = new UserService(_mockHttpClient, _mockUserAdapter.Object, _theMovieSettings.Object);
        }

        [Test]
        public void Login()
        {
        }

        [Test]
        public void CreateRequestToken()
        {
        }
    }
}
