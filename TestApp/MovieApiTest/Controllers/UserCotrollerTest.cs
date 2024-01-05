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
        CreateRequestTokenResponseModel _createRequestTokenResponse;
        LoginResponseModelDto _loginResponse;

        UserController _controller;

        private void MockController()
        {
            LoginRequestModelDto loginRequest = null;

            _mockUserService.Setup(repo => repo.Login(loginRequest))
            .ReturnsAsync(_loginResponse);
            _mockUserService.Setup(repo => repo.CreateRequestToken())
                .ReturnsAsync(_createRequestTokenResponse);

            _controller = new UserController(_mockUserService.Object);
        }
        [SetUp]
        public void Setup()
        {

            //dependencies (mock) + spy
            _createRequestTokenResponse = new CreateRequestTokenResponseModel();
            _loginResponse = new LoginResponseModelDto();
            _mockUserService = new Mock<IUserService>();

            MockController();
        }

        [Test]
        public async Task Login()
        {
            LoginRequestModelDto loginRequest = new LoginRequestModelDto{
                user = "",
                pass = ""
            };
            
            await _controller.Login(loginRequest);

            //assert
            _mockUserService.Verify(loginSpy => loginSpy.Login(loginRequest), Times.Once());
        }
    }
}

