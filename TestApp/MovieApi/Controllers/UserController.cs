using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieApi.Models.AppSettings;
using MovieApi.Models.Common;
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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(LoginResponseModel), 200)]
        [ProducesResponseType(typeof(CommonResponseErrorModel), 500)]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest)
        {
            LoginResponseModel loginResponse;
            loginResponse = await _userService.Login(loginRequest);
            return Ok(loginResponse);
        }
    }
}
