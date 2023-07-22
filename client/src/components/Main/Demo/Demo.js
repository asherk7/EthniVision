import React from 'react'
import {Link} from 'react-router-dom'
import { resetDatabase } from '../../../utils'
import './demo.css'

const Demo = () => {
  return (
    <div>
      <Link to="/male">
        <button onClick={resetDatabase}>
          Male
        </button>
      </Link>
      <Link to="/female">
        <button onClick={resetDatabase}>
          female
        </button>
      </Link>
    </div>
  )
}

export default Demo