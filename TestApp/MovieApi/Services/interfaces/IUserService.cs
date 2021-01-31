using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Request;
using MovieApi.Models.User.Login.Response;
using System.Threading.Tasks;

namespace MovieApi.services.interfaces
{
    public interface IUserService
    {
         Task<LoginResponseModel> Login(LoginRequestModelDto loginRequest);
        Task<CreateRequestTokenResponseModel> CreateRequestToken();


    }
}
