using Microsoft.Extensions.Options;
using Moq;
using MovieApi.Controllers;
using MovieApi.Models.AppSettings;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.services.interfaces;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace MovieApiTest.Controllers
{
    public class UserCotrollerTest
    {
        Mock<IUserService> _mockUserService;
        CreateRequestTokenResponseModel _createRequestTokenResponse = new CreateRequestTokenResponseModel();
        LoginResponseModel _loginResponse = new LoginResponseModel();

        UserController _controller;

        [SetUp]
        public void Setup()
        {

            //dependencies (mock) + spy
            _mockUserService = new Mock<IUserService>();

            LoginRequestModel loginRequest = null;


            _mockUserService.Setup(repo => repo.Login(loginRequest))
                .ReturnsAsync(_loginResponse);
            _mockUserService.Setup(repo => repo.CreateRequestToken())
                .ReturnsAsync(_createRequestTokenResponse);

            _controller = new UserController(_mockUserService.Object);
        }

        [Test]
        public async Task Login()
        {
            LoginRequestModel loginRequest = new LoginRequestModel{
                user = "",
                pass = ""
            };
            
            await _controller.Login(loginRequest);

            //assert
            _mockUserService.Verify(loginSpy => loginSpy.Login(loginRequest), Times.Once());
        }
    }
}

