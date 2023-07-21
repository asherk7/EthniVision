import React from 'react'
import { Link } from 'react-router-dom'
import './redirect.css'

const Redirect = () => {
  return (
    <div>
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
      <Link to="/female">
        <button>
          female
        </button>
      </Link>
    </div>
  )
}

export default Redirect