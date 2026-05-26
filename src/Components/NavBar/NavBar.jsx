import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './NavBar.css'
import { useAuth } from '../../context/AuthContext'

function NavBar() {
  const [showSearch, setShowSearch] = useState(false)
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = term.trim()
    if (!trimmed) return

    navigate(`/search?query=${encodeURIComponent(trimmed)}`)
    setShowSearch(false)
    setTerm('')
  }

  const closeSearch = () => {
    setShowSearch(false)
    setTerm('')
  }

  useEffect(() => {
    if (!showSearch) return undefined

    const handleKey = (e) => {
      if (e.key === 'Escape') closeSearch()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [showSearch])

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img
          className="navbar-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/tv-shows">TV Shows</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/my-list">My List</NavLink>
      </div>

      <div className="navbar-search">
        <button
          type="button"
          className="navbar-search-btn"
          onClick={() => setShowSearch((prev) => !prev)}
          aria-label={showSearch ? 'Close search' : 'Open search'}
          aria-expanded={showSearch}
        >
          ⌕
        </button>

        {showSearch && (
          <div
            className="navbar-search-overlay"
            onClick={closeSearch}
          >
            <form
              className="navbar-search-form"
              onSubmit={handleSearchSubmit}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="navbar-search-form__icon" aria-hidden="true">
                ⌕
              </span>
              <input
                type="search"
                className="navbar-search-form__input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search movies, TV shows..."
                autoFocus
                aria-label="Search movies and TV shows"
              />
              <button
                type="button"
                className="navbar-search-form__close"
                onClick={closeSearch}
                aria-label="Close search"
              >
                ×
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="navbar-profile">
        <img
          className="navbar-avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Profile"
        />
        <span className="navbar-caret" aria-hidden="true" />
        <div className="navbar-dropdown">
          <p className="navbar-dropdown__item">
            {user?.name || user?.email || 'Account'}
          </p>
          <button
            type="button"
            className="navbar-dropdown__item navbar-dropdown__item--logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
