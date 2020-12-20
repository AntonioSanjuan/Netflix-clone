using MovieApi.Models.Common.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Common.Response.Notification
{
    public class ResponseNotificationModel
    {
        public GenericErrorModel Error { get; set; }
    }
}
