﻿using MovieApi.Models.Dtos.Movie.GetMovieGenres.Response;
using MovieApi.Models.Movie;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.Movie.GetMovieInfo.Request;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Modules.ConversionTypeModules.MovieConversionTypeModules.MovieConversionType
{
    public static class MovieInfoConversionTypeModule
    {
        public static MovieInfoResponseModelDto Success(GetMovieInfoResponseModel getMovieInfoResponseModel, List<MovieImageResponseModel> topRatedImageMovies)
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
                    Videos = ConvertVideos(getMovieInfoResponseModel.videos),
                    Similar = MovieConversionTypeModule.ConvertMovies(getMovieInfoResponseModel.similar.Results, topRatedImageMovies)
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
        public static List<GenreDto> ConverGenres(List<Genre> genres)
        {
            List<GenreDto> output = new List<GenreDto>();

            if (genres != null)
            {
                foreach (Genre genre in genres)
                {
                    output.Add(new GenreDto()
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
                foreach (MovieVideo video in videos.results)
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
