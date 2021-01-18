using MovieApi.Models.Common.Error;
using MovieApi.Models.Common.Response.Notification;
using MovieApi.Models.Common.Response.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ConversionTypeModules.CommonConversionTypeModule
{
    public static class CommonConversionTypeModule
    {
        public static ResponseSchemaModel CreateSchema(string methodName)
        {
            return new ResponseSchemaModel()
            {
                ResponseMethod = methodName,
                ResponseTime = 0
            };
        }

        public static ResponseNotificationModel CreateFailureNotification()
        {
            return new ResponseNotificationModel()
            {
                Error = new GenericErrorModel
                {
                    Error = null,
                    ErrorCode = -1,
                    ErrorMessage = "something goes wrong ;("
                }
            };
        }

        public static ResponseNotificationModel CreateSuccessNotification()
        {
            return new ResponseNotificationModel()
            {
                Error = new GenericErrorModel
                {
                    Error = null,
                    ErrorCode = 0,
                    ErrorMessage = "nA"
                }
            };
        }
    }
}
