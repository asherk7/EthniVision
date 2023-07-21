import React from 'react'
import Header from '../Main/Header/Header'
import About from '../Main/About/About'
import ML from './ML/ML'
import Redirect from './Redirect/Redirect'
import Footer from '../Main/Footer/Footer'

const Female = () => {
  return (
    <div>
        <Header />
        <About />
        <ML />
        <Redirect />
        <Footer />
    </div>
  )
}

export default Female