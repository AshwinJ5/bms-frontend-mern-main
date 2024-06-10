import React from 'react'
import banner from '../Images/banner01.jpg'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'
import MovieCards from '../Components/MovieCards'
import EventCards from '../Components/EventCards'
import SportCards from '../Components/SportCards'

function Landing() {
  return (
    <>
    <div className="render">

    </div>
        <img id='bannerFixed' src={banner}  alt="" />

        <Header/>
        <Banner/>
        <MovieCards/>
        <SportCards/>
        <EventCards/>
        <Newsletter/>
        <Footer/>
    </>
  )
}

export default Landing