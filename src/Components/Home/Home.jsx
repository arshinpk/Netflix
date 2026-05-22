import React from 'react'
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
  return (
    <div className="home">
      <Banner />
      <RowPost rowId="trending" title="Trending Now" urls={trending} />
      <RowPost
        rowId="originals"
        title="Netflix Originals"
        isSmall
        isTv
        urls={originals}
      />
      <RowPost rowId="action" title="Action" isSmall urls={action} />
      <RowPost rowId="comedy" title="Comedy" isSmall urls={comedy} />
      <RowPost rowId="horror" title="Horror" isSmall urls={horror} />
      <RowPost rowId="romance" title="Romance" isSmall urls={romance} />
    </div>
  )
}

export default Home
