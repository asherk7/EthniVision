import React from 'react'
import {Link} from 'react-router-dom'
import { resetDatabase } from '../../../utils'
import './demo.css'

const Demo = () => {
  return (
    <div classname='container'>
      <Link to="/predict">
        <button className='btn' onClick={resetDatabase}>
          Predict
        </button>
      </Link>
    </div>
  )
}

export default Demo