import { API_KEY } from './Constants/Constants';
const timeWindow = 'week';

export const originals = `discover/tv?api_key=${API_KEY}&with_networks=213`;
export const action = `discover/movie?api_key=${API_KEY}&with_genres=28`;
export const comedy = `discover/movie?api_key=${API_KEY}&with_genres=35`;
export const horror = `discover/movie?api_key=${API_KEY}&with_genres=27`;
export const trending = `trending/all/week?api_key=${API_KEY}&language=en-US`;
export const romance = `discover/movie?api_key=${API_KEY}&with_genres=10749`;

export const tvTrending = `trending/tv/week?api_key=${API_KEY}&language=en-US`;
export const tvNetflix = `discover/tv?api_key=${API_KEY}&with_networks=213`;
export const tvAction = `discover/tv?api_key=${API_KEY}&with_genres=10759`;
export const tvComedy = `discover/tv?api_key=${API_KEY}&with_genres=35`;
export const tvCrime = `discover/tv?api_key=${API_KEY}&with_genres=80`;

//Movie Urls
export const popularMovies = `movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
export const topRatedMovies = `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
export const upcomingMovies = `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const trendingMovies = `trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US&page=1`;

export const movieDetails = (movieId) =>
  `movie/${movieId}?api_key=${API_KEY}&language=en-US`

export const tvDetails = (tvId) =>
  `tv/${tvId}?api_key=${API_KEY}&language=en-US`

export const mediaDetails = (id, mediaType) =>
  mediaType === 'tv' ? tvDetails(id) : movieDetails(id)

export const searchUrl = (query) =>
  `search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`