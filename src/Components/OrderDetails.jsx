import React from 'react'
import bann from '../Images/bann.jpg'
import PaymentPage from './PaymentPage'
import OrderSummary from './OrderSummary'

function OrderDetails({id}) {
  
  return (
    <>

<div className="moviesOneTwo my-5  w-100">
    <div className="row mx-auto w-100 ">
        <div className="col-lg-8 my-5 p-2">

        <img className='py-3' src={bann} width={'100%'} height={'200'} style={{borderRadius:'10px'}} alt="" />



 
        </div>
        <div className="col-lg-4 my-5 p-2">
        <OrderSummary id={id} />

        </div>
    </div>
</div>

    </>
  )
}

export default OrderDetails