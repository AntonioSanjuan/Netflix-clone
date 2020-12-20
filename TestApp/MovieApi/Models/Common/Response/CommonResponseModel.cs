using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Models.Common.Request
{
    public class CommonRequestModel<T>
    {
        public ResponseSchemaModel ResponseSchema { get; set; }
        public T Content { get; set; }
        public ResponseNotificationModel Notification { get; set; }
    }
}
