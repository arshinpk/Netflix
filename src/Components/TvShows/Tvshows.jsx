import React from 'react'
import RowPost from '../RowPost/RowPost'
import {
  tvTrending,
  tvNetflix,
  tvAction,
  tvComedy,
  tvCrime,
} from '../../Urls'
import './Tvshows.css'

function Tvshows() {
  return (
    <div className="tvshows">
      <h1 className="tvshows__heading">TV Shows</h1>
      <RowPost
        rowId="tv-trending"
        title="Trending TV"
        urls={tvTrending}
        isTv
      />
      <RowPost
        rowId="tv-netflix"
        title="Netflix Series"
        isSmall
        isTv
        urls={tvNetflix}
      />
      <RowPost
        rowId="tv-action"
        title="Action & Adventure"
        isSmall
        isTv
        urls={tvAction}
      />
      <RowPost
        rowId="tv-comedy"
        title="Comedy Series"
        isSmall
        isTv
        urls={tvComedy}
      />
      <RowPost rowId="tv-crime" title="Crime" isSmall isTv urls={tvCrime} />
    </div>
  )
}

export default Tvshows
