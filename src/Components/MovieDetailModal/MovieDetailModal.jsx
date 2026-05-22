import React, { useEffect, useState } from 'react'
import './MovieDetailModal.css'
import axios from '../../axios'
import { mediaDetails } from '../../Urls'
import { imageUrl, API_KEY } from '../../Constants/Constants'
import { useVideo } from '../../context/VideoContext'

function MovieDetailModal() {
  const { selectedMovie, closeMovieDetail, setActiveVideo } = useVideo()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!selectedMovie) return undefined

    setLoading(true)
    setDetails(null)

    axios
      .get(mediaDetails(selectedMovie.id, selectedMovie.mediaType))
      .then((response) => {
        setDetails(response.data)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [selectedMovie])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeMovieDetail()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [closeMovieDetail])

  const playTrailer = () => {
    if (!selectedMovie) return

    const { id, mediaType, rowId } = selectedMovie

    axios
      .get(`/${mediaType}/${id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          closeMovieDetail()
          setActiveVideo({
            rowId,
            movieId: id,
            videoId: response.data.results[0].key,
          })
        } else {
          console.log('No trailer found')
        }
      })
      .catch((error) => {
        console.error('Error fetching trailer:', error)
      })
  }

  const releaseYear =
    details?.release_date?.slice(0, 4) ||
    details?.first_air_date?.slice(0, 4) ||
    ''

  return (
    <div className="detail-modal" onClick={closeMovieDetail} role="dialog" aria-modal="true">
      <div className="detail-modal__box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="detail-modal__close"
          onClick={closeMovieDetail}
          aria-label="Close details"
        >
          ×
        </button>

        {loading && <p className="detail-modal__loading">Loading...</p>}

        {!loading && details && (
          <>
            <div
              className="detail-modal__hero"
              style={{
                backgroundImage: details.backdrop_path
                  ? `url(${imageUrl + details.backdrop_path})`
                  : 'none',
              }}
            >
              <div className="detail-modal__hero-fade" />
            </div>

            <div className="detail-modal__info">
              <h1 className="detail-modal__title">
                {details.title || details.name}
              </h1>

              <div className="detail-modal__meta">
                {releaseYear && <span>{releaseYear}</span>}
                {details.vote_average > 0 && (
                  <span>{details.vote_average.toFixed(1)} ★</span>
                )}
                {selectedMovie.mediaType === 'tv' && <span>TV Series</span>}
                {selectedMovie.mediaType === 'movie' && <span>Movie</span>}
              </div>

              <p className="detail-modal__overview">{details.overview}</p>

              <div className="detail-modal__buttons">
                <button
                  type="button"
                  className="detail-modal__btn detail-modal__btn--play"
                  onClick={playTrailer}
                >
                  ▶ Play
                </button>
                <button
                  type="button"
                  className="detail-modal__btn detail-modal__btn--trailer"
                  onClick={playTrailer}
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieDetailModal
