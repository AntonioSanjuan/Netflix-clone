using Microsoft.AspNetCore.Mvc;
using MovieApi.Models.Common;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Request;
using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Request;
using MovieApi.Models.Dtos.Movie.GetMoviesByGenre.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.services.interfaces;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        
        [HttpPost("TopRatedMovies")]
        [ProducesResponseType(typeof(TopRatedMoviesResponseModelDto), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> GetTopRatedMovies([FromBody] TopRatedMoviesRequestModelDto topRatedMoviesRequest)
        {
            TopRatedMoviesResponseModelDto topRatedMoviesResponse;
            topRatedMoviesResponse = await _movieService.GetTopRatedMovies(topRatedMoviesRequest);
            return Ok(topRatedMoviesResponse);
        }

        [HttpPost("GetMovieInfo")]
        [ProducesResponseType(typeof(MovieInfoResponseModelDto), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> GetMovieInfo([FromBody] GetMovieInfoRequestModelDto movieInfoRequest)
        {
            MovieInfoResponseModelDto topRatedMoviesResponse;
            topRatedMoviesResponse = await _movieService.GetMovieInfo(movieInfoRequest);
            return Ok(topRatedMoviesResponse);
        }

        [HttpPost("GetMovieGenres")]
        [ProducesResponseType(typeof(MovieGenresResponseModelDto), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> GetMovieGenres([FromBody] MovieGenresRequestModelDto movieGenresRequest)
        {
            MovieGenresResponseModelDto movieGenresResponse;
            movieGenresResponse = await _movieService.GetMovieGenres(movieGenresRequest);
            return Ok(movieGenresResponse);
        }

        [HttpPost("GetMoviesByGenre")]
        [ProducesResponseType(typeof(MoviesByGenreResponseModelDto), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> GetMoviesByGenre([FromBody] MoviesByGenreRequestModelDto moviesByGenreRequestModel)
        {
            MoviesByGenreResponseModelDto moviesByGenreResponse;
            moviesByGenreResponse = await _movieService.GetMoviesByGenre(moviesByGenreRequestModel);
            return Ok(moviesByGenreResponse);
        }
    }
}
