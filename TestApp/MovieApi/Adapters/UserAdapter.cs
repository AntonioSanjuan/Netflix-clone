using MovieApi.adapters.interfaces;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.adapters
{
    public class UserAdapter : IUserAdapter
    {
        private readonly IUserService _userService;

        public UserAdapter(IUserService userService)
        {
            _userService = userService;
        }
    }
}
