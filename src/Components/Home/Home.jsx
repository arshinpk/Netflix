import React, { useState } from 'react'
import Banner from '../Banner/Banner'
import RowPost from '../RowPost/RowPost'
import {
  originals,
  action,
  comedy,
  horror,
  trending,
  romance,
} from '../../Urls'
import './Home.css'

function Home() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div className="home">
      <Banner />
      <RowPost
        rowId="trending"
        title="Trending Now"
        urls={trending}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="originals"
        title="Netflix Originals"
        isSmall
        isTv
        urls={originals}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="action"
        title="Action"
        isSmall
        urls={action}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="comedy"
        title="Comedy"
        isSmall
        urls={comedy}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="horror"
        title="Horror"
        isSmall
        urls={horror}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
      <RowPost
        rowId="romance"
        title="Romance"
        isSmall
        urls={romance}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
    </div>
  )
}

export default Home
