using MovieApi.adapters;
using MovieApi.Models.Movie.GetMovieImages.Response;
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
        public void ToTopRatedMoviesResponse()
        {
            GetTopRatedMoviesResponseModel getTopRatedMoviesResponseRequestParam = null;
            List<MovieImageResponseModel> topRatedImageMoviesRequestParam = new List<MovieImageResponseModel>();
            var actual = _adapter.ToTopRatedMoviesResponse(getTopRatedMoviesResponseRequestParam, topRatedImageMoviesRequestParam);
        }

        [Test]
        public void TopTopRatedMoviesErrorResponse()
        {
            var actual = _adapter.TopTopRatedMoviesErrorResponse();

            Assert.AreEqual(1, actual.Content.Page);
            Assert.AreEqual(1, actual.Content.Total_pages);
            Assert.AreEqual(0, actual.Content.Total_results);
            Assert.IsNull(actual.Content.Movies);
            Assert.AreEqual("GetTopRatedMovies", actual.ResponseSchema.ResponseMethod);
        }
    }
}