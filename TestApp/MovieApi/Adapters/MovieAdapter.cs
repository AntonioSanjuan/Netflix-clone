using MovieApi.adapters.interfaces;
using MovieApi.services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.adapters
{
    public class MovieAdapter : IMovieAdapter
    {
        private readonly IMovieService _movieService;

        public MovieAdapter(IMovieService movieService)
        {
            _movieService = movieService;
        }
    }
}
