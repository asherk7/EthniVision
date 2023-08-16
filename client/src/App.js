import React from 'react'
import Main from './components/Main/Main'
import Predict from './components/Prediction/Predict.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/predict" element={<Predict/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
