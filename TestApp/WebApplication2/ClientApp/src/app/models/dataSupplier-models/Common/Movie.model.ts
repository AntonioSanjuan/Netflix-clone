export interface Movie {
    images: MovieImages;
    overview: string;
    releaseDate: string;
    movieId: number;
    originalTitle: string;
    originalLanguage: string;
    title: string;
    popularity: number;
    voteCount: number;
    voteAverage: number;
  }
  
  export interface MovieImages {
    movieId: number;
    posterImageToBase64: string;
    backdropImageToBase64: string;
  }