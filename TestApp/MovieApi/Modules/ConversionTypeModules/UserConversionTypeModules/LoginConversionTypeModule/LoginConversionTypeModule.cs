using MovieApi.Models.Common.Error;
using MovieApi.Models.Common.Response.Notification;
using MovieApi.Models.Common.Response.Schema;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User.Login.Response;

namespace MovieApi.Modules.ConversionTypeModules.LoginConversionTypeModule
{
    public static class LoginConversionTypeModule
    {
        public static LoginResponseModel Sucess(CreateRequestTokenResponseModel createRequestTokenResponse)
        {
            LoginResponseModel output = new LoginResponseModel()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(),
                Content = new LoginResponseContent
                {
                    IsValid = true,
                    AccessToken = createRequestTokenResponse.Request_token
                }
            };
            return output;
        }

        public static LoginResponseModel Failure()
        {
            LoginResponseModel output = new LoginResponseModel()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(),
                Content = new LoginResponseContent()
                {
                    IsValid = false,
                    AccessToken = string.Empty
                }
            };
            return output;
        }
    }
}
