using MovieApi.Models.AppSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ServiceNameModule.UserServiceNameModule
{
    public static class UserServiceNameModule
    {
        public static string CreateRequestTokenUrl(TheMoviedbSettingsModel theMoviedbSettings)
        {
            var v3Settings = theMoviedbSettings.Version.V3;
            string output = v3Settings.BaseUrl + v3Settings.SubUrls.createRequestToken;
            output = output.Replace("<<api_key>>", v3Settings.ApiKey);
            return output;
        }
    }
}
