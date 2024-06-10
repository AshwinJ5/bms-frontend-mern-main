// components/ShowSelect.js
import React, { useContext, useEffect, useState } from 'react';
import adver from '../Images/adShow.jpg';
import { MDBTabs, MDBTabsItem } from 'mdb-react-ui-kit';
import { getMovieDetailsByIdAPI } from '../Services/allApi';
import { movieBookingDetailsContext } from '../ContextAPI/ContextSharing';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ShowSelect({ id }) {
  const [basicActive, setBasicActive] = useState('');
  const [activeTime, setActiveTime] = useState('');
  const [singleMovies, setSingleMovies] = useState({});
  const [dateRange, setDateRange] = useState([]);
  const { movieBookingDetails, setMovieBookingDetails } = useContext(movieBookingDetailsContext);
  const navigate = useNavigate();

  const handleBasicClick = (value) => {
    if (value !== basicActive) setBasicActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovieDetailsByIdAPI(id);
        if (result.status === 200) {
          setSingleMovies(result.data);
          handleGetDateRange(result.data.movieFrom, result.data.movieTo);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error fetching movie details',
          text: 'Please try again later',
          icon: 'error',
          timer: 2000,
        });
        console.error('Error fetching movie details:', error);
      }
    };
    fetchData();
  }, [id]);

  const bookingid=sessionStorage.getItem("userId")

  useEffect(() => {
    localStorage.removeItem('movieBookingDetails');
  }, []);

  useEffect(() => {
    const savedDetails = localStorage.getItem('movieBookingDetails');
    if (savedDetails) {
      setMovieBookingDetails(JSON.parse(savedDetails));
    }
  }, [setMovieBookingDetails]);

  const getDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    while (startDate <= endDate) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

  const handleGetDateRange = (start, end) => {
    if (start && end) {
      const dates = getDatesInRange(start, end);
      setDateRange(dates);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleClick = (tabValue, dateValue) => {
    handleBasicClick(tabValue);
    const updatedDetails = {
      ...movieBookingDetails,
      userMovieShowDate: dateValue,
      movieId: id,
      userId:bookingid,
      userMovieName: singleMovies.movieName,
      movieImage: singleMovies.movieThumbnail

    };
    setMovieBookingDetails(updatedDetails);
    localStorage.setItem('movieBookingDetails', JSON.stringify(updatedDetails));
  };

  const handleMovieTime = (e) => {
    const time = e.target.getAttribute('value');
    setActiveTime(time);
    const updatedDetails = {
      ...movieBookingDetails,
      userMovieShowTime: time,
    };
    setMovieBookingDetails(updatedDetails);
    localStorage.setItem('movieBookingDetails', JSON.stringify(updatedDetails));
  };

  const selectYourSeats = () => {
    if (!movieBookingDetails.userMovieShowDate) {
      Swal.fire({
        title: "Data Not Given",
        text: "Please Select Date Preferred",
        timer: 2000,
      });
    } else if (!movieBookingDetails.userMovieShowTime) {
      Swal.fire({
        title: "Data Not Given",
        text: "Please Select Time Preferred",
        timer: 2000,
      });
    } else {
      navigate(`/seats/${singleMovies._id}`);
    }
  };

  return (
    <div className='moviesOneTwo my-5 w-100'>
      <style type="text/css">
        {`
          .custom-tab-link.active {
            background-color: #6bd4ac !important;
            font-weight: 800 !important;
            color: black !important;
          }
          .custom-tab-link:hover {
            background-color: #6bd4ac !important;
            font-weight: 800 !important;
            color: black !important;
          }
          .custom-tab-link {
            background-color: transparent !important;
            color: white !important;
          }
          .btn.active {
            background-color: #6bd4ac !important;
            color: white !important;
          }
          .date-tabs-container {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 10px;
          }
          .date-tab {
            flex: 1 1 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <div className="row w-100 mx-auto seatCard">
        <div className="col-lg-8 m-auto px-3">
          <div className='MovieTitle fs-1 fw-bolder mx-2 mt-4'>
            {singleMovies.movieName}
          </div>
          <div style={{ fontWeight: '300' }} className='fs-6 mx-2 mb-4'>
            {singleMovies.movieGenre} / {singleMovies.releaseDate && formatDate(singleMovies.releaseDate)}
          </div>
          <div className='mx-auto date-tabs-container' style={{ overflowX: 'auto' }}>
            {dateRange.map((date, index) => (
              <MDBTabs key={index} className='date-tab'>
                <MDBTabsItem className='my-3 '>
                  <li
                    className={basicActive === `tab${index + 1}` ? 'custom-tab-link active' : 'custom-tab-link'}
                    onClick={() => handleClick(`tab${index + 1}`, formatDate(date))}
                    value={formatDate(date)}
                    active={basicActive === `tab${index + 1}`}>
                    {formatDate(date).slice(0,7)}
                  </li>
                </MDBTabsItem>
              </MDBTabs>
            ))}
          </div>

          <div style={{ border: "2px solid #6bd4ac", borderRadius: "10px" }} className='p-3 mt-5 text-end'>
            <div style={{ color: '#5760f6' }} className="fw-bold d-flex">Screen {singleMovies.screensShowing}</div>
            <div className='d-block divTheater mx-auto justify-items-space-between active'>
              {['10:00 AM', '02:00 PM', '06:00 PM', '09:00 PM'].map((time, index) => (
                <div key={index} className={`btn mx-2 my-2 ${activeTime === time ? 'active' : ''}`}>
                  <li onClick={handleMovieTime} value={time} className='fw-bolder'>{time}</li>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div onClick={selectYourSeats} className='btn navButton mt-5 d-inline-block text-light rounded-pill'>SELECT SEATS</div>
          </div>
        </div>
        <div className="col-lg-4 mx-auto p-3">
          <img src={adver} style={{ borderRadius: '10px' }} width={'100%'} alt="Advertisement" />
        </div>
      </div>
    </div>
  );
}

export default ShowSelect;
