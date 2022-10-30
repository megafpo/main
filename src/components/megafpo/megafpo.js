import React from 'react'
import Mapwrapper from '../map/mapwrapper'
import '../Header/header.css'
import Header from '../Header/header'
import Footer from '../Header/footer'

export default function megafpo() {
  
  // getData();
  return (
    <>
      <div>
        <Header />
      </div>
        <div className='megafpomap'>
          <Mapwrapper/>
        </div>
        
        <div>
          <Footer/>
        </div>
    </>
  )
}