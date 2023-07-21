import React from 'react'
import {Link} from 'react-router-dom'
import './demo.css'

const Demo = () => {
  return (
    <div className="nav">
      <Link to="/male">
        <button>
          Male
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

export default Demo