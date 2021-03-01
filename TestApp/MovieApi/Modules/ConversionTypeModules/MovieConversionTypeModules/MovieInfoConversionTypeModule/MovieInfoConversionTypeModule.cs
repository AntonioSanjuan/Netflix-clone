using MovieApi.Models.Movie;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieInfoConversionTypeModule
{
    public static class MovieInfoConversionTypeModule
    {
        public static MovieInfoResponseModelDto Success(GetMovieInfoResponseModel getMovieInfoResponseModel)
        {
            MovieInfoResponseModelDto output = new MovieInfoResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateSuccessNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMovieInfo),
                Content = new MovieInfoResponseContent()
                {
                    MovieId = getMovieInfoResponseModel.id,
                    ImdbId = getMovieInfoResponseModel.imdb_id,
                    Homepage = getMovieInfoResponseModel.homepage,
                    ReleaseDate = getMovieInfoResponseModel.release_date,
                    Genres = ConverGenres(getMovieInfoResponseModel.genres),
                    Videos = ConvertVideos(getMovieInfoResponseModel.videos)
                }
            };
            return output;
        }
        public static MovieInfoResponseModelDto Failure()
        {
            MovieInfoResponseModelDto output = new MovieInfoResponseModelDto()
            {
                Notification = CommonConversionTypeModule.CommonConversionTypeModule.CreateFailureNotification(),
                ResponseSchema = CommonConversionTypeModule.CommonConversionTypeModule.CreateSchema(MovieServiceMethodNames.GetMovieInfo),
                Content = new MovieInfoResponseContent()
                {
                    MovieId = 0,
                    ImdbId = string.Empty,
                    Homepage = string.Empty,
                    ReleaseDate = string.Empty,
                    Genres = null,
                    Videos = null
                }
            };
            return output;
        }

        public static List<MovieInfoGenres> ConverGenres(List<Genre> genres)
        {
            List<MovieInfoGenres> output = new List<MovieInfoGenres>();

            if (genres != null)
            {
                foreach (Genre genre in genres)
                {
                    output.Add(new MovieInfoGenres()
                    {
                        Id = genre.id,
                        Name = genre.name
                    });
                }
            }

            return output;
        }

        public static List<MovieInfoVideos> ConvertVideos(Videos videos)
        {
            List<MovieInfoVideos> output = new List<MovieInfoVideos>();
            if (videos != null)
            {
                foreach (Result video in videos.results)
                {
                    output.Add(new MovieInfoVideos()
                    {
                        VideoId = video.id,
                        Site = video.site,
                        Size = video.size,
                        VideoKey = video.key,
                        VideoType = video.type
                    });
                }
            }
            return output;
        }
    }
}
