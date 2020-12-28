using MovieApi.Models.TheMoviedb.Responses.Auth.CreateRequestToken;
using MovieApi.Models.User.Login.Response;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieApi.adapters.interfaces
{
    public interface IUserAdapter
    {
        Task<LoginResponseModel> ToLoginResponse(HttpResponseMessage response);
        Task<CreateRequestTokenResponseModel> ToRequestTokenResponse(HttpResponseMessage response);
    }
}
