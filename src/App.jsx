import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import Tvshows from './Components/TvShows/Tvshows'
import './App.css'
import Search from './Components/Search/Search'
import Movies from './Components/Movies/Movies'
import VideoProvider, { useVideo } from './context/VideoContext'
import TrailerModal from './Components/TrailerModal/TrailerModal'
import StreamModal from './Components/StreamModal/StreamModal'
import MovieDetailModal from './Components/MovieDetailModal/MovieDetailModal'

function PagePlaceholder({ title }) {
  return (
    <div className="page-placeholder">
      <h1>{title}</h1>
      <p>Coming soon</p>
    </div>
  )
}

function GlobalMovieDetail() {
  const { selectedMovie } = useVideo()

  if (!selectedMovie) return null

  return <MovieDetailModal />
}

function GlobalPlayer() {
  const { activeVideo, closeTrailer } = useVideo()

  if (!activeVideo) return null

  if (activeVideo.mode === 'stream' && activeVideo.streamUrl) {
    return (
      <StreamModal
        embedUrl={activeVideo.streamUrl}
        onClose={closeTrailer}
      />
    )
  }

  if (activeVideo.videoId) {
    return (
      <TrailerModal
        videoId={activeVideo.videoId}
        onClose={closeTrailer}
      />
    )
  }

  return null
}

function App() {
  return (
    <VideoProvider>
      <div className="app">
        <NavBar />
        <GlobalMovieDetail />
        <GlobalPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<Tvshows />} />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/new-and-popular"
            element={<PagePlaceholder title="New & Popular" />}
          />
          <Route path="/my-list" element={<PagePlaceholder title="My List" />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </VideoProvider>
  )
}

export default App
