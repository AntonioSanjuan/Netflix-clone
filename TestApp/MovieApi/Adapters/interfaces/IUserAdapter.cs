using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Response;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieApi.adapters.interfaces
{
    public interface IUserAdapter
    {
        Task<LoginResponseModelDto> ToLoginResponse(HttpResponseMessage response);
        Task<CreateRequestTokenResponseModel> ToRequestTokenResponse(HttpResponseMessage response);
        LoginResponseModelDto ToLoginErrorResponse();

    }
}
