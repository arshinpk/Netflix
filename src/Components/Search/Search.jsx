import React, { useState, useEffect } from 'react'
import './Search.css'
import { useSearchParams } from 'react-router-dom'
import axios from '../../axios'
import { searchUrl } from '../../Urls'
import { imageUrl, API_KEY } from '../../Constants/Constants'
import { useVideo } from '../../context/VideoContext'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const { setActiveVideo } = useVideo()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    axios
      .get(searchUrl(query))
      .then((response) => {
        const filtered = response.data.results.filter(
          (item) => item.media_type === 'movie' || item.media_type === 'tv'
        )
        setResults(filtered)
      })
      .catch((error) => {
        console.error('Error fetching search results:', error)
        setResults([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])

  const openTrailer = (item) => {
    const mediaType = item.media_type === 'tv' ? 'tv' : 'movie'

    axios
      .get(`/${mediaType}/${item.id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setActiveVideo({
            rowId: 'search',
            movieId: item.id,
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

  return (
    <div className="search">
      <h1 className="search__title">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>

      {loading && <p className="search__message">Searching...</p>}

      {!loading && query && results.length === 0 && (
        <p className="search__message">No results found.</p>
      )}

      {!loading && !query && (
        <p className="search__message">
          Use the search icon above to find movies and TV shows.
        </p>
      )}

      <div className="search__grid">
        {results.map((item) => {
          const imagePath = item.poster_path || item.backdrop_path
          if (!imagePath) return null

          return (
            <div
              key={`${item.media_type}-${item.id}`}
              className="search__card"
              onClick={() => openTrailer(item)}
            >
              <img
                src={imageUrl + imagePath}
                alt={item.title || item.name}
              />
              <p className="search__card-title">{item.title || item.name}</p>
              <span className="search__card-type">
                {item.media_type === 'tv' ? 'TV' : 'Movie'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Search
