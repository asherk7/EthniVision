import React from 'react'
import Main from './components/Main/Main'
import Female from './components/FemalePrediction/Female.js'
import Male from './components/MalePrediction/Male.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/male" element={<Male/>} />
          <Route path="/female" element={<Female/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
