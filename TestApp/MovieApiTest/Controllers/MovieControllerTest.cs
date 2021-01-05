using Moq;
using MovieApi.Controllers;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.services.interfaces;
using NUnit.Framework;

namespace MovieApiTest.Controllers
{
    public class MovieControllerTest
    {
        [SetUp]
        public void Setup()
        {
            var mockMovieService = new Mock<IMovieService>();

            TopRatedMoviesRequestModel loginRequest = null;
            TopRatedMoviesResponseModel loginResponse = null;
            mockMovieService.Setup(repo => repo.GetTopRatedMovies(loginRequest))
                .ReturnsAsync(loginResponse);

            var controller = new MovieController(mockMovieService.Object);
        }

        [Test]
        public void TopTatedMovies()
        {
            Assert.Pass();
        }
    }
}
