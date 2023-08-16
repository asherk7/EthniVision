import React from 'react'
import {Link} from 'react-router-dom'
import { resetDatabase } from '../../../utils'
import './demo.css'

const Demo = () => {
  return (
    <div>
      <Link to="/predict">
        <button onClick={resetDatabase}>
          Predict
        </button>
      </Link>
    </div>
  )
}

export default Demo