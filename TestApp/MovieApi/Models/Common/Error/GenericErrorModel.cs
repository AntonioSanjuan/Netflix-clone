using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Common.Error
{
    public class GenericErrorModel
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public dynamic Error { get; set; }
    }
}
