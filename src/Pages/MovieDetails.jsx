import React from 'react'
import Newsletter from '../Components/Newsletter'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import IndividualMovie from '../Components/IndividualMovie'
import { useParams } from 'react-router-dom'

function MovieDetails() {
  const {id}=useParams()

  return (
    <>
       <Header/>
       <IndividualMovie id={id}/>
       <Newsletter/>
       <Footer/>
       
    </>
  )
}

export default MovieDetails