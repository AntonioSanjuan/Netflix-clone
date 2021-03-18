using Moq;
using MovieApi.Controllers;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Request;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Request;
using MovieApi.Models.Movie.GetMovieInfo.Request;
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
            TopRatedMoviesResponseModelDto loginResponse = null;

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

        [Test]
        public async Task MovieInfo()
        {
            GetMovieInfoRequestModelDto getMovieInfoRequest = new GetMovieInfoRequestModelDto();
            await _controller.GetMovieInfo(getMovieInfoRequest);

            //assert
            _mockMovieService.Verify(spy => spy.GetMovieInfo(getMovieInfoRequest), Times.Once());
        }

        [Test]
        public async Task MovieGenres()
        {
            MovieGenresRequestModelDto movieGenresRequest = new MovieGenresRequestModelDto();
            await _controller.GetMovieGenres(movieGenresRequest);

            //assert
            _mockMovieService.Verify(spy => spy.GetMovieGenres(movieGenresRequest), Times.Once());
        }

        [Test]
        public async Task MoviesByGenre()
        {
            MoviesByGenreRequestModelDto moviesByGenreRequest = new MoviesByGenreRequestModelDto();
            await _controller.GetMoviesByGenres(moviesByGenreRequest);

            //assert
            _mockMovieService.Verify(spy => spy.GetMoviesByGenre(moviesByGenreRequest), Times.Once());
        }
    }
}
