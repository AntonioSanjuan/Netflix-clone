using Microsoft.Extensions.Options;
using MovieApi.adapters.interfaces;
using MovieApi.Models.AppSettings;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using MovieApi.Modules.ServiceNameModule.UserServiceNameModule;
using MovieApi.services.interfaces;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieApi.services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;
        private readonly IUserAdapter _userAdapter;
        private readonly TheMoviedbSettingsModel _theMoviedbSettings;
        private readonly UserServiceNameModule _serviceNameModule;
        public UserService(
            HttpClient httpClient, 
            IUserAdapter userAdapter,
            IOptions<TheMoviedbSettingsModel> theMoviedbSettingsModel)
        {
            _httpClient = httpClient;
            _userAdapter = userAdapter;
            _theMoviedbSettings = theMoviedbSettingsModel.Value;

            _serviceNameModule = new UserServiceNameModule(_theMoviedbSettings);
        }

        public async Task<CreateRequestTokenResponseModel> CreateRequestToken()
        {
            try
            {
                string url = _serviceNameModule.CreateRequestTokenUrl();
                HttpResponseMessage response = _httpClient.GetAsync(url).Result;
                CreateRequestTokenResponseModel requestTokenResponse = await _userAdapter.ToRequestTokenResponse(response);
                return requestTokenResponse;
            }
            catch(Exception)
            {
                return (CreateRequestTokenResponseModel) new CreateRequestTokenResponseModel().CreateErrorFromService();
            }
        }

        public async Task<LoginResponseModel> Login(LoginRequestModelDto loginRequest)
        {
            try
            {
                string url = _serviceNameModule.CreateRequestTokenUrl();
                HttpResponseMessage response = _httpClient.GetAsync(url).Result;
                LoginResponseModel loginResponse = await _userAdapter.ToLoginResponse(response);
                return loginResponse;
            }
            catch (Exception)
            {
                return _userAdapter.ToLoginErrorResponse();
            }
        }

    }
}
