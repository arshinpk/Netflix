import { createContext, useContext, useState } from 'react'

const VideoContext = createContext(null)

export default function VideoProvider({ children }) {
  const [activeVideo, setActiveVideo] = useState(null)

  const openTrailer = ({ rowId, movieId, videoId }) => {
    setActiveVideo({ rowId, movieId, videoId })
  }

  const closeTrailer = () => {
    setActiveVideo(null)
  }

  const value = {
    activeVideo,
    openTrailer,
    closeTrailer,
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
