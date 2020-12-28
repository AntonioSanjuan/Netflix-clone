using Microsoft.Extensions.Options;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.Modules.ServiceNameModule.UserServiceNameModule;
using MovieApi.services.interfaces;
using System.Net.Http;

namespace MovieApi.services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;
        private readonly IUserAdapter _userAdapter;
        private readonly TheMoviedbSettingsModel _theMoviedbSettings;
        public UserService(
            HttpClient httpClient, 
            IUserAdapter userAdapter,
            IOptions<TheMoviedbSettingsModel> theMoviedbSettingsModel)
        {
            _httpClient = httpClient;
            _userAdapter = userAdapter;
            _theMoviedbSettings = theMoviedbSettingsModel.Value;
        }

        public LoginResponseModel Login(LoginRequestModel loginRequest)
        {
            string url = UserServiceNameModule.CreateRequestTokenUrl(_theMoviedbSettings);
            HttpResponseMessage response = _httpClient.GetAsync(url).Result;

            return new LoginResponseModel();
        }
    }
}
