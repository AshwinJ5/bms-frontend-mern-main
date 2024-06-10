import React, { useContext, useEffect, useState } from 'react';
import './seating.css';
import screenimg from '../Images/screen.png';
import { movieBookingDetailsContext } from '../ContextAPI/ContextSharing';
import { getMovieBookingDataSeatsAPI } from '../Services/allApi';
import { useNavigate } from 'react-router-dom';

function Seating({ seatBooking, singleMovies }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieBookingDatas, setMovieBookingDatas] = useState([]);
  const [inactiveSeats, setInactiveSeats] = useState([]);
  const { movieBookingDetails, setMovieBookingDetails } = useContext(movieBookingDetailsContext);

  // Load all booking data
  const getMovieBookingDatas = async () => {
    const result = await getMovieBookingDataSeatsAPI();
    if (result.status === 200) {
      setMovieBookingDatas(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getMovieBookingDatas();
  }, []);

  useEffect(() => {
    const presentMovieId = movieBookingDetails.movieId;
    const presentShowDate = movieBookingDetails.userMovieShowDate;
    const presentShowTime = movieBookingDetails.userMovieShowTime;

    const conditions = {
      movieId: presentMovieId,
      userMovieShowDate: presentShowDate,
      userMovieShowTime: presentShowTime,
    };

    // Finding matching date movie time datas
    const findMatchingObjects = (array, conditions) => {
      return array.filter(obj =>
        Object.keys(conditions).every(key => obj[key] === conditions[key])
      );
    };

    const matchingMovies = findMatchingObjects(movieBookingDatas, conditions);

    const combinedSeats = matchingMovies.reduce((acc, booking) => {
      return acc.concat(booking.userMovieSeatNumber.split(','));
    }, []);
    setInactiveSeats(combinedSeats);
  }, [movieBookingDatas, movieBookingDetails]);

  // Load initial state from local storage
  useEffect(() => {
    const savedDetails = localStorage.getItem('movieBookingDetails');
    if (savedDetails) {
      const details = JSON.parse(savedDetails);
      setSelectedSeats(details.userMovieSeatNumber || []);
      setMovieBookingDetails(details);
    }
  }, [setMovieBookingDetails]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      let updatedSeats;
      if (prevSelectedSeats.includes(seat)) {
        // Remove the seat if it's already selected
        updatedSeats = prevSelectedSeats.filter(s => s !== seat);
      } else if (prevSelectedSeats.length < seatBooking) {
        // Add the seat if less than seatBooking seats are selected
        updatedSeats = [...prevSelectedSeats, seat];
      } else {
        // Replace the first selected seat if seatBooking seats are already selected
        updatedSeats = [...prevSelectedSeats.slice(1), seat];
      }

      // Update local storage and context
      const updatedDetails = {
        ...movieBookingDetails,
        userMovieSeatNumber: updatedSeats,
        userNumberOfSeats: updatedSeats.length,
      };
      setMovieBookingDetails(updatedDetails);
      localStorage.setItem('movieBookingDetails', JSON.stringify(updatedDetails));

      return updatedSeats;
    });
  };

  const isSeatSelected = (seat) => selectedSeats.includes(seat);
  const isSeatInactive = (seat) => inactiveSeats.includes(seat);

  const navigate = useNavigate();
  const confirmSeats = () => {
    if (selectedSeats.length > 0) {
      navigate(`/payment/${singleMovies._id}`);
    }
  };

  return (
    <>
      <style type='text/css'>
        {`
          .seating li.active {
            background-color: #6bd4ac;
            color: white;
          }
          .btn.inactive {
            background-color: grey;
            cursor: not-allowed;
          }
        `}
      </style>
      <div className='text-center mt-5 d-grid'>
        <img src={screenimg} width={'70%'} alt="Screen" />
        <small>All eyes this way please!</small>
      </div>
      <div className='mt-5 fs-5'><strong>₹200</strong> SCREEN-5</div>
      <div className="seatingOfTheatre text-center mx-auto">
        {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
          <div key={row} className='seating my-2'>
            <span>{row}</span>
            {[...Array(10).keys()].map(i => {
              const seat = `${row}${i + 1}`;
              return (
                <li
                  key={seat}
                  value={seat}
                  className={`border border-light ${isSeatSelected(seat) ? 'active' : ''} ${isSeatInactive(seat) ? 'inactive' : ''}`}
                  onClick={() => !isSeatInactive(seat) && handleSeatClick(seat)}
                >
                  {i + 1}
                </li>
              );
            })}
            <span>{row}</span>
          </div>
        ))}
      </div>
      <div className="text-center my-4">
        <div
          onClick={confirmSeats}
          className={`btn navButton text-uppercase text-light rounded-pill ${selectedSeats.length === 0 ? 'inactive' : ''}`}
        >
          Confirm seats
        </div>
      </div>
    </>
  );
}

export default Seating;
