using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieApi.Models.AppSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        TheMoviedbSettingsModel _theMoviedbSettings;
        public MovieController(IOptions<TheMoviedbSettingsModel> theMoviedbSettings)
        {
            _theMoviedbSettings = theMoviedbSettings.Value;
        }
    }
}
