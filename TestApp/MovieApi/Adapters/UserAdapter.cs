using MovieApi.adapters.interfaces;
using MovieApi.Models.TheMoviedb;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Response;
using MovieApi.Modules.ConversionTypeModules.LoginConversionTypeModule;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MovieApi.adapters
{
    public class UserAdapter : IUserAdapter
    {
        public UserAdapter() {}

        public async Task<CreateRequestTokenResponseModel> ToRequestTokenResponse(HttpResponseMessage response)
        {
            var responseAsString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            CreateRequestTokenResponseModel createRequestTokenResponse = JsonSerializer.Deserialize<CreateRequestTokenResponseModel>(responseAsString, options);
            return createRequestTokenResponse;
        }

        public async Task<LoginResponseModelDto> ToLoginResponse(HttpResponseMessage response)
        {
            var responseAsString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            CreateRequestTokenResponseModel createRequestTokenResponse = JsonSerializer.Deserialize<CreateRequestTokenResponseModel>(responseAsString, options);

            return (createRequestTokenResponse.Status_code == (int)MoviedbStatusCodes.Success) ? 
                LoginConversionTypeModule.Sucess(createRequestTokenResponse) :
                LoginConversionTypeModule.Failure();
        }

        public LoginResponseModelDto ToLoginErrorResponse()
        {
            return LoginConversionTypeModule.Failure();
        }
    }
}
