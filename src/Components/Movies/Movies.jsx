import React from 'react'
import RowPost from '../RowPost/RowPost'
import { popularMovies, topRatedMovies, upcomingMovies, trendingMovies } from '../../Urls'
import './Movies.css'

function Movies() {
  return (
    <div className="movies">
      <h1 className="movies__heading">Movies</h1>
      <RowPost rowId="trending-movies" title="Trending Movies" urls={trendingMovies} />
      <RowPost rowId="upcoming-movies" title="Upcoming Movies" urls={upcomingMovies} />
      <RowPost rowId="popular-movies" title="Popular Movies" urls={popularMovies} />
      <RowPost rowId="top-rated-movies" title="Top Rated Movies" urls={topRatedMovies} />
    </div>
  )
}

export default Movies
