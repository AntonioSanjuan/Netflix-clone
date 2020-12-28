using MovieApi.Models.Common.Error;
using MovieApi.Models.Common.Response.Notification;
using MovieApi.Models.Common.Response.Schema;
using MovieApi.Models.TheMoviedb.Responses.Auth.CreateRequestToken;
using MovieApi.Models.User.Login.Response;

namespace MovieApi.Modules.ConversionTypeModules.LoginConversionTypeModule
{
    public static class LoginConversionTypeModule
    {
        public static LoginResponseModel Sucess(CreateRequestTokenResponseModel createRequestTokenResponse)
        {
            LoginResponseModel output = new LoginResponseModel()
            {
                Notification = CreateSucessNotification(),
                ResponseSchema = CreateSchema(),
                Content = new LoginResponseContent
                {
                    IsValid = true,
                    AccessToken = createRequestTokenResponse.Request_token
                }
            };
            return output;
        }

        public static LoginResponseModel Failure(CreateRequestTokenResponseModel createRequestTokenResponse)
        {
            LoginResponseModel output = new LoginResponseModel()
            {
                Notification = CreateFailureNotification(),
                ResponseSchema = CreateSchema(),
                Content = new LoginResponseContent()
                {
                    IsValid = false,
                    AccessToken = string.Empty
                }
            };
            return output;
        }

        private static ResponseSchemaModel CreateSchema()
        {
            return new ResponseSchemaModel()
            {
                ResponseMethod = "Login",
                ResponseTime = 0
            };
        }

        private static ResponseNotificationModel CreateFailureNotification()
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

        private static ResponseNotificationModel CreateSucessNotification()
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
