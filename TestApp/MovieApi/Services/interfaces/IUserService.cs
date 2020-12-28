using MovieApi.Models.TheMoviedb.Responses.Auth.CreateRequestToken;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.services.interfaces
{
    public interface IUserService
    {
         Task<LoginResponseModel> Login(LoginRequestModel loginRequest);
        Task<CreateRequestTokenErrorResponseModel> CreateRequestToken();


    }
}
