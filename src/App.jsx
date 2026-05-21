import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/Home/Home'
import Tvshows from './Components/TvShows/Tvshows'
import './App.css'
import Search from './Components/Search/Search'

function PagePlaceholder({ title }) {
  return (
    <div className="page-placeholder">
      <h1>{title}</h1>
      <p>Coming soon</p>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<Tvshows />} />
        <Route path="/movies" element={<PagePlaceholder title="Movies" />} />
        <Route
          path="/new-and-popular"
          element={<PagePlaceholder title="New & Popular" />}
        />
        <Route path="/my-list" element={<PagePlaceholder title="My List" />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
