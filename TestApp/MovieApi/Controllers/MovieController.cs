using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieApi.Models.AppSettings;
using MovieApi.Models.Common;
using MovieApi.Models.Movie.GetTopTatedMovies.Request;
using MovieApi.Models.Movie.GetTopTatedMovies.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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
        [ProducesResponseType(typeof(TopRatedMoviesResponseModel), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> GetTopRatedMovies([FromBody] TopRatedMoviesRequestModel topRatedMoviesRequest)
        {
            TopRatedMoviesResponseModel topRatedMoviesResponse;
            topRatedMoviesResponse = await _movieService.GetTopRatedMovies(topRatedMoviesRequest);
            return Ok(topRatedMoviesResponse);
        }
    }
}
