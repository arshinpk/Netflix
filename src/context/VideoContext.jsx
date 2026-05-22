import { createContext, useContext, useState } from 'react'
import { vidsrcMovieEmbed, vidsrcTvEmbed } from '../Urls'

const VideoContext = createContext(null)

export default function VideoProvider({ children }) {
  const [activeVideo, setActiveVideo] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const openTrailer = ({ rowId, movieId, videoId }) => {
    setActiveVideo({ mode: 'trailer', rowId, movieId, videoId })
  }

  const openStream = ({ id, mediaType, rowId, season = 1, episode = 1 }) => {
    const streamUrl =
      mediaType === 'tv'
        ? vidsrcTvEmbed(id, season, episode)
        : vidsrcMovieEmbed(id)

    setActiveVideo({
      mode: 'stream',
      streamUrl,
      movieId: id,
      rowId,
      mediaType,
      season,
      episode,
    })
  }

  const closeTrailer = () => {
    setActiveVideo(null)
  }

  const openMovieDetail = ({ id, mediaType, rowId }) => {
    setSelectedMovie({ id, mediaType, rowId })
  }

  const closeMovieDetail = () => {
    setSelectedMovie(null)
  }

  const value = {
    activeVideo,
    selectedMovie,
    openTrailer,
    openStream,
    closeTrailer,
    openMovieDetail,
    closeMovieDetail,
    setActiveVideo,
  }

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideo() {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}
