using Microsoft.Extensions.Options;
using Moq;
using MovieApi.Controllers;
using MovieApi.Models.AppSettings;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.services.interfaces;
using NUnit.Framework;
namespace MovieApiTest.Controllers
{
    public class UserCotrollerTest
    {
        [SetUp]
        public void Setup()
        {
            //dependencies (mock)
            var mockUserService = new Mock<IUserService>();

            LoginRequestModel loginRequest = null;
            LoginResponseModel loginResponse = null;
            mockUserService.Setup(repo => repo.Login(loginRequest))
                .ReturnsAsync(loginResponse);

            var controller = new UserController(mockUserService.Object);
        }

        [Test]
        public void Login()
        {
        }
    }
}

