import React, { useEffect, useState } from 'react'

import './RowPost.css'

import axios from '../../axios'

import { imageUrl, API_KEY } from '../../Constants/Constants'

import Youtube from 'react-youtube'



function RowPost(props) {

  const [movies, setMovies] = useState([])



  useEffect(() => {

    axios.get(props.urls).then((response) => {

      setMovies(response.data.results)

    }).catch((err) => {

      console.log(err)

    })

  }, [props.urls])



  const opts = {

    height: '390',

    width: '100%',

    playerVars: {

      autoplay: 1,

    },

  }



  const isActiveRow =

    props.activeVideo?.rowId === props.rowId &&

    props.activeVideo?.movieId != null



  const handleMovie = (id) => {

    if (isActiveRow && props.activeVideo.movieId === id) {

      props.setActiveVideo(null)

      return

    }



    axios.get(`/movie/${id}/videos?api_key=${API_KEY}`).then((response) => {

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



  return (

    <div className='row'>

      <h2>{props.title}</h2>

      <div className="posters">

        {movies.map((movie) => (

          <img

            key={movie.id}

            onClick={() => handleMovie(movie.id)}

            className={props.isSmall ? 'smallPoster' : 'poster'}

            src={imageUrl + movie.backdrop_path}

            alt={movie.name}

          />

        ))}

      </div>

      {isActiveRow && props.activeVideo.videoId && (

        <Youtube videoId={props.activeVideo.videoId} opts={opts} />

      )}

    </div>

  )

}



export default RowPost

