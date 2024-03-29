﻿using MovieApi.Models.Common.Error;
using MovieApi.Models.Common.Response.Notification;
using MovieApi.Models.Common.Response.Schema;
using MovieApi.Models.TheMoviedb.Auth.CreateRequestToken.Response;
using MovieApi.Models.User;
using MovieApi.Models.User.Login.Response;

namespace MovieApi.Modules.ConversionTypeModules.LoginConversionTypeModule
{
    public static class LoginConversionTypeModule
    {
        public static LoginResponseModelDto Sucess(CreateRequestTokenResponseModel createRequestTokenResponse)
        {
            LoginResponseModelDto output = new LoginResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(UserServiceMethodNames.Login),
                Content = new LoginResponseContent
                {
                    IsValid = createRequestTokenResponse.Success,
                    AccessToken = createRequestTokenResponse.Request_token
                }
            };
            return output;
        }

        public static LoginResponseModelDto Failure()
        {
            LoginResponseModelDto output = new LoginResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(UserServiceMethodNames.Login),
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
