using MovieApi.Models.AppSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ServiceNameModule.UserServiceNameModule
{
    public class UserServiceNameModule
    {
        TheMoviedbSettingsModel _theMoviedbSettings;
        public UserServiceNameModule(TheMoviedbSettingsModel theMoviedbSettings)
        {
            _theMoviedbSettings = theMoviedbSettings;
        }

        public string CreateRequestTokenUrl()
        {
            var v3Settings = _theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.createRequestToken;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            return output;
        }
    }
}
