using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response
{
    public class CreateRequestTokenErrorResponseModel
    {
        public string Status_message { get; set; }
        public int Status_code { get; set; }
    }
}
