import React, { useContext, useEffect, useState } from 'react'
import Seating from './Seating'
import { Link } from 'react-router-dom'
import { movieBookingDetailsContext } from '../ContextAPI/ContextSharing';
import { getMovieDetailsByIdAPI } from '../Services/allApi';

function SeatTheatre({id,seatBooking}) {

  const [singleMovies, setSingleMovies] = useState({});
  const { movieBookingDetails, setMovieBookingDetails } = useContext(movieBookingDetailsContext);


  useEffect(() => {

    const fetchData = async () => {
        const result = await getMovieDetailsByIdAPI(id);
        if (result.status === 200) {
            setSingleMovies(result.data);
        }
    };
    fetchData();
}, [id]);

   // Format date to "DD MMM YYYY"
   const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
};
  // console.log(movieBookingDetails);
  return (
    <>
    <div className="moviesOneTwo">

    <div className='MovieTitle fs-1 fw-bolder mx-2 mt-4'>{singleMovies.movieName}</div>
    <div style={{fontWeight:'300'}} className='fs-6 mx-2  mb-4'>{singleMovies.movieGenre}/ {formatDate(singleMovies.releaseDate)}</div>
    <div className='mx-2 seatDate'>

        <span className='text-uppercase fs-5 me-2'>Your Showtime</span>
        <span className='text-uppercase fw-bold me-2 seatdetail'>{movieBookingDetails.userMovieShowDate}</span>
        <span  className='text-uppercase fw-bold me-2 seatdetail'>{movieBookingDetails.userMovieShowTime} </span>
    </div>
        <div className="containe  w-100">
          <Seating seatBooking={seatBooking} singleMovies={singleMovies} />
        {/* <div className="text-center my-4">
      <Link to={`/payment/${singleMovies._id}`}><div className='btn navButton text-uppercase  text-light rounded-pill'>Confirm seats</div></Link>
    </div> */}
    </div>
    
        


    </div>
    </>
  )
}

export default SeatTheatre