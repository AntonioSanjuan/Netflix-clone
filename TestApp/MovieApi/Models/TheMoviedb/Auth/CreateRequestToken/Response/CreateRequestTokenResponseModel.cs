using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response
{
    public class CreateRequestTokenResponseModel : CreateRequestTokenErrorResponseModel
    {
        public bool Success { get; set; }
        public string Expires_at { get; set; }
        public string Request_token { get; set; }
    }
}
