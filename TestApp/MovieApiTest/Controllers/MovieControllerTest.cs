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
        [SetUp]
        public void Setup()
        {
            _mockMovieService = new Mock<IMovieService>();

            TopRatedMoviesRequestModel loginRequest = null;
            TopRatedMoviesResponseModel loginResponse = null;
            _mockMovieService.Setup(repo => repo.GetTopRatedMovies(loginRequest))
                .ReturnsAsync(loginResponse);

            _controller = new MovieController(_mockMovieService.Object);
        }

        [Test]
        public async Task TopTatedMovies()
        {
            TopRatedMoviesRequestModel getTopRatedMoviesRequest = new TopRatedMoviesRequestModel();
            await _controller.GetTopTatedMovies(getTopRatedMoviesRequest);

            //assert
            _mockMovieService.Verify(spy => spy.GetTopRatedMovies(getTopRatedMoviesRequest), Times.Once());
        }
    }
}
