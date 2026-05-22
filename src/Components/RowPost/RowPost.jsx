import React, { useEffect, useRef, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl } from '../../Constants/Constants'
import { useVideo } from '../../context/VideoContext'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [showArrows, setShowArrows] = useState(false)
  const postersRef = useRef(null)
  const { activeVideo, openMovieDetail } = useVideo()

  useEffect(() => {
    axios
      .get(props.urls)
      .then((response) => {
        setMovies(response.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.urls])

  const isActiveRow =
    activeVideo?.rowId === props.rowId &&
    activeVideo?.movieId != null

  const handlePosterClick = (movie) => {
    openMovieDetail({
      id: movie.id,
      mediaType: props.isTv ? 'tv' : 'movie',
      rowId: props.rowId,
    })
  }

  const scrollRow = (direction) => {
    if (!postersRef.current) return
    const amount = postersRef.current.clientWidth * 0.8
    postersRef.current.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="row">
      <h2 className="row__title">{props.title}</h2>

      <div
        className="row__slider"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <button
          type="button"
          className={`row__arrow row__arrow--left ${showArrows ? 'row__arrow--visible' : ''}`}
          onClick={() => scrollRow(-1)}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="posters" ref={postersRef}>
          {movies.map((movie) => {
            const isActive =
              isActiveRow && activeVideo.movieId === movie.id
            const imagePath = movie.backdrop_path || movie.poster_path

            if (!imagePath) return null

            return (
              <div
                key={movie.id}
                className="poster-card"
                onClick={() => handlePosterClick(movie)}
              >
                <img
                  className={`${props.isSmall ? 'smallPoster' : 'poster'} ${
                    isActive ? 'poster--active' : ''
                  }`}
                  src={imageUrl + imagePath}
                  alt={movie.title || movie.name}
                />
                <h4 className="poster-card__title">
                  {movie.title || movie.name}
                </h4>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          className={`row__arrow row__arrow--right ${showArrows ? 'row__arrow--visible' : ''}`}
          onClick={() => scrollRow(1)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default RowPost
