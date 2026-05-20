import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
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
        <NavLink to="/new-and-popular">New & Popular</NavLink>
        <NavLink to="/my-list">My List</NavLink>
      </div>

      <div className="navbar-profile">
        <img
          className="navbar-avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Profile"
        />
        <span className="navbar-caret" aria-hidden="true" />
        <div className="navbar-dropdown">
          <p className="navbar-dropdown__item">John Doe</p>
          <p className="navbar-dropdown__item navbar-dropdown__item--logout">
            Logout
          </p>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
