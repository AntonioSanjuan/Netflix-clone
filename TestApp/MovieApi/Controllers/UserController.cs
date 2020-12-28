using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieApi.Models.AppSettings;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TheMoviedbSettingsModel _theMoviedbSettings;
        private readonly IUserService _userService;
        public UserController(IOptions<TheMoviedbSettingsModel> theMoviedbSettings)
        {
            //_userService = userService;
            _theMoviedbSettings = theMoviedbSettings.Value;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest)
        {
            LoginResponseModel loginResponse = null;

            return Ok(loginResponse);
        }
    }
}
