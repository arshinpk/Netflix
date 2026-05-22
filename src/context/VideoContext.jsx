import { createContext, useContext, useState } from 'react'

const VideoContext = createContext(null)

export default function VideoProvider({ children }) {
  const [activeVideo, setActiveVideo] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const openTrailer = ({ rowId, movieId, videoId }) => {
    setActiveVideo({ rowId, movieId, videoId })
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
