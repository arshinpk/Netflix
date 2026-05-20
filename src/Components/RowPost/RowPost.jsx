import React, { useEffect, useRef, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../Constants/Constants'
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [showArrows, setShowArrows] = useState(false)
  const postersRef = useRef(null)

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
    props.activeVideo?.rowId === props.rowId &&
    props.activeVideo?.movieId != null

  const handleMovie = (id) => {
    if (isActiveRow && props.activeVideo.movieId === id) {
      props.setActiveVideo(null)
      return
    }

    const mediaType = props.isTv ? 'tv' : 'movie'
    axios.get(`/${mediaType}/${id}/videos?api_key=${API_KEY}`).then((response) => {
      if (response.data.results.length !== 0) {
        props.setActiveVideo({
          rowId: props.rowId,
          movieId: id,
          videoId: response.data.results[0].key,
        })
      } else {
        props.setActiveVideo(null)
        console.log('No video found')
      }
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
              isActiveRow && props.activeVideo.movieId === movie.id
            const imagePath = movie.backdrop_path || movie.poster_path

            if (!imagePath) return null

            return (
              <img
                key={movie.id}
                onClick={() => handleMovie(movie.id)}
                className={`${props.isSmall ? 'smallPoster' : 'poster'} ${
                  isActive ? 'poster--active' : ''
                }`}
                src={imageUrl + imagePath}
                alt={movie.title || movie.name}
              />
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
