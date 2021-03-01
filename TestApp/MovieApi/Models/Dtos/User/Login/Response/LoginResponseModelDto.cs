using MovieApi.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.User.Login.Response
{
    public class LoginResponseModelDto : CommonResponseModel<LoginResponseContent>{}

    public class LoginResponseContent
    {
        public bool IsValid { get; set; }
        public string AccessToken { get; set; }
    }
}