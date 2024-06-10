import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'
import MovieAllCards from '../Components/MovieAllCards'
import { AnimatePresence } from 'framer-motion'

function AllMovies() {
  return (
    <div>
        <Header/>
        <AnimatePresence>
        <MovieAllCards/>          
        </AnimatePresence>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default AllMovies