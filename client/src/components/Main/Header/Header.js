import React from 'react'
import header from '../../../resources/header.jpg'
import './header.css'

const Header = () => {
  return (
    <div className='container'>
      <img src={header} alt='Header of EthniVision'/>
    </div>
  )
}

export default Header