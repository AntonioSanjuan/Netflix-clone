using MovieApi.adapters.interfaces;
using MovieApi.services.interfaces;
using System.Net.Http;

namespace MovieApi.services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;
        private readonly IUserAdapter _userAdapter;

        public UserService(HttpClient httpClient,IUserAdapter userAdapter)
        {
            _httpClient = httpClient;
            _userAdapter = userAdapter;
        }
    }
}
