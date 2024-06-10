import React, { useEffect, useState } from 'react'
import { getAllMovieBookingDetailsAPI } from '../Services/allApi';

function AdminBookings() {
  const [movieBookingData,setMovieBookingData]=useState([])

  const getAllMovieBookings = async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (token && email ) {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        const result= await getAllMovieBookingDetailsAPI(reqHeader)
        if (result.status===200) {
            setMovieBookingData(result.data)
        } else {
            console.log(result);
        }
    }
  };
  // console.log(movieBookingData);

useEffect(()=>{
  getAllMovieBookings()
},[])

//total revenue calculations
const totalRevenue = movieBookingData.reduce((accumulator, employee) => accumulator + Number(employee.userTicketAmount), 0);






  return (
    <div className='moviesOneTwo mt-5 p-3 w-100'>
        <div className='h3 fw-bold mb-3'>Total Bookings</div>
        <div className=' mb-3'>Total Revenue Earned-   <span style={{backgroundColor:'#6bd4ac',color:"black"}} className="badge fs-6 fw-bolder rounded-pill d-inline"><span style={{backgroundColor:'#6bd4ac',color:"black"}} className='me-2 fs-6'>₹</span>{totalRevenue}</span></div>
        <table className="table align-middle mb-5  table-striped" >
  <thead  style={{backgroundColor:"#0a1e5e",position:'sticky',top:'0'}} className=" text-center text-light">
    <tr style={{border:"2px #5760f6 solid"}}>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">No</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">UserId</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Date</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Time</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">No. of seats</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Revenue</th>
    </tr>
  </thead>
  <tbody>
  {movieBookingData.map((movie, index) => (
    <tr key={index} style={{border:"2px #5760f6 solid"}}>
      <td className='text-white'>
          {index+1}
      </td>
      <td className='text-white'>
          {movie.userId}
      </td>
      <td className='text-white'>
          {movie.userMovieShowDate}
      </td>
      <td className='text-white'>
          {movie.userMovieShowTime}
      </td>
      <td className='text-white'>
        <span style={{backgroundColor:'#6bd4ac',color:"black"}} className="badge rounded-pill d-inline">{movie.userNumberOfSeats}</span>
      </td>
      <td className='text-white fw-bolder'>
          <span className='me-2'>₹</span>{movie.userTicketAmount}
      </td>
      
      
    </tr>
    
  ))}
    

  </tbody>
</table>
        
    </div>
  )
}

export default AdminBookings