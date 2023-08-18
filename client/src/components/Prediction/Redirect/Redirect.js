import React from 'react'
import { Link } from 'react-router-dom'
import { resetDatabase } from '../../../utils'
import './redirect.css'

const Redirect = () => {
  return (
    <div>
      <Link to="/">
        <button onClick={resetDatabase}>
          Home
        </button>
      </Link>
    </div>
  )
}

export default Redirect