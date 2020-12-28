using Microsoft.Extensions.Options;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.TheMoviedb.Responses.Auth.CreateRequestToken;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.Modules.ServiceNameModule.UserServiceNameModule;
using MovieApi.services.interfaces;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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

        public async Task<CreateRequestTokenErrorResponseModel> CreateRequestToken()
        {
            string url = UserServiceNameModule.CreateRequestTokenUrl(_theMoviedbSettings);
            HttpResponseMessage response = _httpClient.GetAsync(url).Result;
            CreateRequestTokenErrorResponseModel requestTokenResponse = await _userAdapter.ToRequestTokenResponse(response);
            return requestTokenResponse;
        }

        public async Task<LoginResponseModel> Login(LoginRequestModel loginRequest)
        {
            string url = UserServiceNameModule.CreateRequestTokenUrl(_theMoviedbSettings);
            HttpResponseMessage response = _httpClient.GetAsync(url).Result;
            LoginResponseModel loginResponse = await _userAdapter.ToLoginResponse(response);
            return loginResponse;
        }

    }
}
