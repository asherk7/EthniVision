import React from 'react'
import { Link } from 'react-router-dom'
import './redirect.css'

const Redirect = () => {
  return (
    <div>
      <Link to="/male">
        <button>
          Male
        </button>
      </Link>
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
    </div>
  )
}

export default Redirect