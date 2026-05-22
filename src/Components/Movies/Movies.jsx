import React, { useState } from 'react'
import RowPost from '../RowPost/RowPost'
import { popularMovies, topRatedMovies, upcomingMovies, trendingMovies } from '../../Urls'
import './Movies.css'
import TrailerModal from '../TrailerModal/TrailerModal'

function Movies() {
  const [activeVideo, setActiveVideo] = useState(null)
  return (
    <div className="movies">
      {activeVideo?.videoId && (
        <TrailerModal
          videoId={activeVideo.videoId}
          onClose={() => setActiveVideo(null)}
        />
      )}
      <h1 className="movies__heading">Movies</h1>
      <RowPost
        rowId="trending-movies"
        title="Trending Movies"
        urls={trendingMovies}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="upcoming-movies"
        title="Upcoming Movies"
        urls={upcomingMovies}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="popular-movies"
        title="Popular Movies"
        urls={popularMovies}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="top-rated-movies"
        title="Top Rated Movies"
        urls={topRatedMovies}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
    </div>
  )
}

export default Movies