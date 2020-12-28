using MovieApi.Models.Common.Response.Notification;
using MovieApi.Models.Common.Response.Schema;

namespace MovieApi.Models.Common
{
    public class CommonResponseModel<T>
    {
        public ResponseSchemaModel ResponseSchema { get; set; }
        public T Content { get; set; }
        public ResponseNotificationModel Notification { get; set; }
    }
}
