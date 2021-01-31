using Moq;
using MovieApi.Controllers;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.User.Login.Request;
using MovieApi.services.interfaces;
using NUnit.Framework;
using System.Threading.Tasks;

namespace MovieApiTest.Controllers
{
    public class MovieControllerTest
    {
        Mock<IMovieService> _mockMovieService;
        MovieController _controller;

        private void MockController()
        {
            TopRatedMoviesRequestModelDto loginRequest = null;
            TopRatedMoviesResponseModel loginResponse = null;

            _mockMovieService.Setup(repo => repo.GetTopRatedMovies(loginRequest))
                .ReturnsAsync(loginResponse);

            _controller = new MovieController(_mockMovieService.Object);
        }

        [SetUp]
        public void Setup()
        {
            _mockMovieService = new Mock<IMovieService>();
            MockController();
        }

        [Test]
        public async Task TopRatedMovies()
        {
            TopRatedMoviesRequestModelDto getTopRatedMoviesRequest = new TopRatedMoviesRequestModelDto();
            await _controller.GetTopRatedMovies(getTopRatedMoviesRequest);

            //assert
            _mockMovieService.Verify(spy => spy.GetTopRatedMovies(getTopRatedMoviesRequest), Times.Once());
        }
    }
}
