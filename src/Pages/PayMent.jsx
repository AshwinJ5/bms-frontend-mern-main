import React from 'react'
import OrderDetails from '../Components/OrderDetails'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'

function PayMent() {
  const {id}=useParams()

  return (
    <>
      <Header/>
      <OrderDetails id={id} />
      <Newsletter/>
       <Footer/> 


    </>
  )
}

export default PayMent