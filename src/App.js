import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import './App.css';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News';

const App = () => {
  const pageSize = 15
  const country = 'in'
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(10)

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar color='#f11946' progress={progress} height={3} />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category="general" />} />
          <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country={country} category="general" />} />
          <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country={country} category="business" />} />
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country={country} category="health" />} />
          <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country={country} category="science" />} />
          <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country={country} category="technology" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App