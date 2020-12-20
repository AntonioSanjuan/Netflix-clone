using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieApi.Models.AppSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{

    [Route("")]
    [ApiController]
    public class MainSaveController : ControllerBase
    {
        [HttpGet()]
        public IActionResult Home()
        {
            return Ok(
                "UserController current status: WORKING!\n" +
                "Version: " + Assembly.GetExecutingAssembly().GetName().Version);
        }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IOptions<AppSettingsModel> appSettings)
        {
        }
    }
}
