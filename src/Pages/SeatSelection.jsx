import React, { useState } from 'react'
import Footer from '../Components/Footer'
import Newsletter from '../Components/Newsletter'
import Header from '../Components/Header'
import SeatTheatre from '../Components/SeatTheatre'
import { useParams } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Swal from 'sweetalert2'

function SeatSelection() {
  const [seatBooking,setSeatBooking]=useState(1)
  const {id}=useParams()

  const substractTicket=()=>{
    if(seatBooking<5 && seatBooking>1){
      setSeatBooking(seatBooking-1)
    }
  }

  const addTicket=()=>{
    if(seatBooking<4 && seatBooking>0){
      setSeatBooking(seatBooking+1)
    }else {
      Swal.fire({
        title: "Maximun 4 Seats per person",
        text:"Please select maximum 4 seats",
        timer: 3000,
        showConfirmButton:false
    });
    }
  }


  return (
    <div>
      <Header/>
      <div className="d-flex ">

  <div className="foodNumber stickyButton me-1">        
  <div className='mb-2'>How many seats?</div>
    <button onClick={substractTicket} className='buttonone'>
    <FaMinus /> 
    </button>
    <input value={seatBooking} className='text-center' type="number" />
    <button onClick={addTicket}  className='buttontwo'>
    <FaPlus/>
    </button>
</div>
</div>
      <SeatTheatre id={id} seatBooking={seatBooking} />
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default SeatSelection