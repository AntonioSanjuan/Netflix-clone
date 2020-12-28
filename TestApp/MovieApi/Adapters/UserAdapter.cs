using MovieApi.adapters.interfaces;
using MovieApi.Models.TheMoviedb.Responses.Auth.CreateRequestToken;
using MovieApi.Models.User.Login.Response;
using MovieApi.Modules.ConversionTypeModules.LoginConversionTypeModule;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<LoginResponseModel> ToLoginResponse(HttpResponseMessage response)
        {
            var responseAsString = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            CreateRequestTokenResponseModel createRequestTokenResponse = JsonSerializer.Deserialize<CreateRequestTokenResponseModel>(responseAsString, options);

            return (createRequestTokenResponse.Success) ? 
                LoginConversionTypeModule.Sucess(createRequestTokenResponse) :
                LoginConversionTypeModule.Failure(createRequestTokenResponse);
        }
    }
}
