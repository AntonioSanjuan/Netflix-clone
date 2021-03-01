using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.AppSettings
{
    public class TheMoviedbSettingsModel
    {
        public TheMoviedbVersionSettingsModel Version { get; set; }
    }

    public class TheMoviedbVersionSettingsModel
    {
        public TheMoviedbVersionSettingModel V3 { get; set; }
        public TheMoviedbVersionSettingModel V4 { get; set; }
    }

    public class TheMoviedbVersionSettingModel
    {
        public string BaseUrl { get; set; }
        public string ImageBaseUrl { get; set; }
        public SubUrls SubUrls { get; set; }
        public string ApiKey { get; set; }
    }

    public class SubUrls
    {
        public string createRequestToken { get; set; }
        public string getTopRatedMovies { get; set; }
        public string getMovieInfo { get; set; }

    }
}
