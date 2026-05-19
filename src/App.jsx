 import React, { useState } from 'react'
 import NavBar from './Components/NavBar/NavBar'
 import './App.css'
 import Banner from './Components/Banner/Banner'
 import RowPost from './Components/RowPost/RowPost'
 import { originals, action, comedy, horror, trending } from './Urls'
 
 function App() {
   const [activeVideo, setActiveVideo] = useState(null)
   console.log(activeVideo)

   return (
     <div>
      <NavBar />
      <Banner />
      <RowPost rowId="trending" title='Trending Now' urls={trending} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
      <RowPost rowId="originals" title='Netflix Originals' isSmall urls={originals} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
      <RowPost rowId="action" title='Action' isSmall urls={action} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
      <RowPost rowId="comedy" title='Comedy' isSmall urls={comedy} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
      <RowPost rowId="horror" title='Horror' isSmall urls={horror} activeVideo={activeVideo} setActiveVideo={setActiveVideo}/>
     </div>
   )
 }
 
 export default App
