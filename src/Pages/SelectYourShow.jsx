import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'
import ShowSelect from '../Components/ShowSelect'
import { useParams } from 'react-router-dom'

function SelectYourShow() {
  const { id } = useParams();
  return (
    <div>
        <Header/>
        <ShowSelect id={id}/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default SelectYourShow