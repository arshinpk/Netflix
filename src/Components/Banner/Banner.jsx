import React, { useEffect, useState } from 'react'
import { FaInfoCircle, FaPlus } from 'react-icons/fa'
import './Banner.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/Constants'
import { useVideo } from '../../context/VideoContext'

function Banner() {
  const [movie, setMovie] = useState(null)
  const { openMovieDetail } = useVideo()

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ]
        )
      })
  }, [])

  const handleMoreInfo = () => {
    if (!movie?.id) return
    const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie'
    openMovieDetail({ id: movie.id, mediaType, rowId: 'banner' })
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${
          movie?.backdrop_path ? imageUrl + movie.backdrop_path : ''
        })`,
      }}
    >
      <div className="content">
        <h1 className="title">{movie?.title || movie?.name}</h1>
        <div className="banner-buttons">
          <button
            type="button"
            className="banner-button banner-button--info"
            onClick={handleMoreInfo}
            disabled={!movie}
          >
            <FaInfoCircle className="banner-button__icon" aria-hidden="true" />
            <span>More Info</span>
          </button>
          <button type="button" className="banner-button banner-button--list">
            <FaPlus className="banner-button__icon" aria-hidden="true" />
            <span>My List</span>
          </button>
        </div>
        <p className="description">{movie?.overview}</p>
      </div>
      <div className="fade_bottom" />
    </div>
  )
}
export default Banner