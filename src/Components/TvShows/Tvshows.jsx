import React, { useState } from 'react'
import RowPost from '../RowPost/RowPost'
import {
  tvTrending,
  tvNetflix,
  tvAction,
  tvComedy,
  tvCrime,
} from '../../Urls'
import TrailerModal from '../TrailerModal/TrailerModal'
import './Tvshows.css'

function Tvshows() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div className="tvshows">
      {activeVideo?.videoId && (
        <TrailerModal
          videoId={activeVideo.videoId}
          onClose={() => setActiveVideo(null)}
        />
      )}
      <h1 className="tvshows__heading">TV Shows</h1>
      <RowPost
        rowId="tv-trending"
        title="Trending TV"
        urls={tvTrending}
        isTv
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="tv-netflix"
        title="Netflix Series"
        isSmall
        isTv
        urls={tvNetflix}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="tv-action"
        title="Action & Adventure"
        isSmall
        isTv
        urls={tvAction}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="tv-comedy"
        title="Comedy Series"
        isSmall
        isTv
        urls={tvComedy}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="tv-crime"
        title="Crime"
        isSmall
        isTv
        urls={tvCrime}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
    </div>
  )
}

export default Tvshows
