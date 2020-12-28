using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.User.Login.Request
{
    public class LoginRequestModel
    {
        public string user { get; set; }
        public string pass { get; set; }
    }
}
