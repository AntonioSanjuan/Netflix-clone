using MovieApi.adapters;
using MovieApi.Models.Movie.GetMovieImages.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieGenres.Response;
using MovieApi.Models.TheMoviedb.Movies.MovieInfo.Response;
using MovieApi.Models.TheMoviedb.Movies.TopRatedMovies.Response;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace MovieApiTest.Adapters
{
    public class MovieAdapterTest
    {
        MovieAdapter _adapter;

        private void MockAdapter()
        {
            _adapter = new MovieAdapter();
        }


        [SetUp]
        public void Setup()
        {
            MockAdapter();
        }

        [Test]
        public void ToTopRatedMoviesResponseWithStatusCodeSuccess()
        {
            MoviesResponseModel getTopRatedMoviesResponseRequestParam = new MoviesResponseModel() { Status_code = 0, Total_results = 0, Results = new List<Movie>(), Page = 1, Total_pages = 1, Success = true};
            List<MovieImageResponseModel> topRatedImageMoviesRequestParam = new List<MovieImageResponseModel>() { };

            MockAdapter();
            var actual = _adapter.ToTopRatedMoviesResponse(getTopRatedMoviesResponseRequestParam, topRatedImageMoviesRequestParam);
            Assert.IsEmpty(actual.Content.Movies);
            Assert.AreEqual("GetTopRatedMovies", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToTopRatedMoviesResponseWithStatusCodeFailure()
        {
            MoviesResponseModel getTopRatedMoviesResponseRequestParam = new MoviesResponseModel() { Status_code = 1 };
            List<MovieImageResponseModel> topRatedImageMoviesRequestParam = new List<MovieImageResponseModel>() {  };

            MockAdapter();
            var actual = _adapter.ToTopRatedMoviesResponse(getTopRatedMoviesResponseRequestParam, topRatedImageMoviesRequestParam);
            Assert.IsNull(actual.Content.Movies);
            Assert.AreEqual("GetTopRatedMovies", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void TopTopRatedMoviesErrorResponse()
        {
            var actual = _adapter.ToTopRatedMoviesErrorResponse();

            Assert.AreEqual(1, actual.Content.Page);
            Assert.AreEqual(1, actual.Content.Total_pages);
            Assert.AreEqual(0, actual.Content.Total_results);
            Assert.IsNull(actual.Content.Movies);
            Assert.AreEqual("GetTopRatedMovies", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieInfoResponseWithStatusCodeSuccess()
        {
            GetMovieInfoResponseModel getTopRatedMoviesResponseRequestParam = new GetMovieInfoResponseModel() { Status_code = 0, similar = new MoviesResponseModel() { Results = new List<Movie>() } };
            List<MovieImageResponseModel> similarImageMoviesRequestParam = new List<MovieImageResponseModel>() {  };


            MockAdapter();
            var actual = _adapter.ToMovieInfoResponse(getTopRatedMoviesResponseRequestParam, similarImageMoviesRequestParam);
            Assert.IsEmpty(actual.Content.Genres);
            Assert.IsEmpty(actual.Content.Videos);
            Assert.IsEmpty(actual.Content.Similar);
            Assert.AreEqual("GetMovieInfo", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieInfoResponseWithStatusCodeFailure()
        {
            GetMovieInfoResponseModel getTopRatedMoviesResponseRequestParam = new GetMovieInfoResponseModel() { Success = false, Status_code = 34, Status_message = "Something goes wrong" };
            List<MovieImageResponseModel> similarImageMoviesRequestParam = new List<MovieImageResponseModel>() { };

            MockAdapter();
            var actual = _adapter.ToMovieInfoResponse(getTopRatedMoviesResponseRequestParam, similarImageMoviesRequestParam);
            Assert.IsNull(actual.Content.Genres);
            Assert.IsNull(actual.Content.Videos);
            Assert.IsNull(actual.Content.Similar);

            Assert.AreEqual("GetMovieInfo", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void TopMovieInfoErrorResponse()
        {
            var actual = _adapter.ToMovieInfoErrorResponse();

            Assert.AreEqual(0, actual.Content.MovieId);
            Assert.AreEqual(string.Empty, actual.Content.ImdbId);
            Assert.AreEqual(string.Empty, actual.Content.Homepage);
            Assert.AreEqual(string.Empty, actual.Content.ReleaseDate);
            Assert.IsNull(actual.Content.Genres);
            Assert.IsNull(actual.Content.Videos);
            Assert.IsNull(actual.Content.Similar);

            Assert.AreEqual("GetMovieInfo", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieGenresResponseWithStatusCodeSuccess()
        {
            MovieGenresResponseModel movieGenresResponseRequestParam = new MovieGenresResponseModel() { Status_code = 0 };


            MockAdapter();
            var actual = _adapter.ToMovieGenresResponse(movieGenresResponseRequestParam);
            Assert.IsEmpty(actual.Content.Genres);
            Assert.AreEqual("GetMovieGenres", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieGenresResponseWithStatusCodeFailure()
        {
            MovieGenresResponseModel movieGenresResponseRequestParam = new MovieGenresResponseModel() { Success = false, Status_code = 34, Status_message = "Something goes wrong" };

            MockAdapter();
            var actual = _adapter.ToMovieGenresResponse(movieGenresResponseRequestParam);
            Assert.IsNull(actual.Content.Genres);
            Assert.AreEqual("GetMovieGenres", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void TopMovieGenresErrorResponse()
        {
            var actual = _adapter.ToMovieGenresErrorResponse();
            Assert.IsNull(actual.Content.Genres);

            Assert.AreEqual("GetMovieGenres", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieByGenreResponseWithStatusCodeSuccess()
        {
            MoviesResponseModel moviesByGenreResponseRequestParam = new MoviesResponseModel() { Status_code = 0, Results = new List<Movie>() { } };
            List<MovieImageResponseModel> similarImageMoviesRequestParam = new List<MovieImageResponseModel>() { };

            MockAdapter();
            var actual = _adapter.ToMoviesByGenreResponse(moviesByGenreResponseRequestParam, similarImageMoviesRequestParam);
            Assert.IsEmpty(actual.Content.Movies);
            Assert.AreEqual("GetMoviesByGenre", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void ToMovieByGenreResponseWithStatusCodeFailure()
        {
            MoviesResponseModel moviesByGenreResponseRequestParam = new MoviesResponseModel() { Success = false, Status_code = 34, Status_message = "Something goes wrong" };
            List<MovieImageResponseModel> similarImageMoviesRequestParam = new List<MovieImageResponseModel>() { };

            MockAdapter();
            var actual = _adapter.ToMoviesByGenreResponse(moviesByGenreResponseRequestParam, similarImageMoviesRequestParam);
            Assert.IsNull(actual.Content.Movies);
            Assert.AreEqual("GetMoviesByGenre", actual.ResponseSchema.ResponseMethod);
        }

        [Test]
        public void TopMovieByGenreErrorResponse()
        {
            var actual = _adapter.ToMoviesByGenreErrorResponse();
            Assert.AreEqual(1, actual.Content.Page);
            Assert.AreEqual(1, actual.Content.Total_pages);
            Assert.AreEqual(0, actual.Content.Total_results);
            Assert.IsNull(actual.Content.Movies);

            Assert.AreEqual("GetMoviesByGenre", actual.ResponseSchema.ResponseMethod);
        }
    }
}