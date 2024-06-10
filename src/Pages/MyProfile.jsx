import React, { useEffect, useState } from 'react';
import user from '../Images/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getAUserDetailsAPI, getUserBookingDetailsAPI } from '../Services/allApi';
import Header from '../Components/Header';
import Swal from 'sweetalert2';
import { SERVER_URL } from '../Services/server_url';
import QRCode from 'react-qr-code';

function MyProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userBookingData, setUserBookingData] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await getAUserDetailsAPI(id, reqHeader);
        if (result.status === 200) {
          setUserData(result.data);
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch user details.", "error");
      }
    } else {
      Swal.fire("Error!", "You are not authorized to perform this action.", "error");
    }
  };

  const fetchUserBookingData = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await getUserBookingDetailsAPI(id, reqHeader);
        if (result.status === 200) {
          setUserBookingData(result.data);
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch booking details.", "error");
      }
    } else {
      Swal.fire("Error!", "You are not authorized to perform this action.", "error");
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserBookingData();
  }, []);

  const handleUserLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged Out!", "You have been logged out.", "success");
        sessionStorage.clear();
        navigate('/login');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "You are still logged in.", "error");
      }
    });
  };

  return (
    <>
      <Header />
      <div className='text-end me-5' style={{ cursor: "pointer" }}>
        <i className="me-1 fa-solid fa-right-from-bracket"></i>
        <a
          style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#6bd4ac' }}
          onClick={handleUserLogout}
        >
          LOGOUT
        </a>
      </div>
      <div className='moviesOneTwo mt-5 p-3 w-100'>
        <div className="row" style={{ minHeight: '65vh' }}>
          <ProfileDetails userData={userData} />
          <BookingDetails userBookingData={userBookingData} />
        </div>
      </div>
    </>
  );
}

const ProfileDetails = ({ userData }) => (
  <div className="col-lg-4 col-sm-6 col-7 text-center ">
    <div className="profile-card py-5 my-auto mx-auto">
      <img src={user} width={"100%"} alt="User Profile" />
      <div className="d-flex my-3">
        <div className="profile-label "> <span style={{color:"#5760f6"}} className='fw-bold me-2'>UserName:</span> <span className="profile-value">{userData.username}</span></div>
      </div>
      <div className="d-flex my-3">
        <div className="profile-label"> <span style={{color:"#5760f6"}} className='fw-bold me-2'> Email: </span><span className="profile-value">{userData.email}</span></div>
      </div>
    </div>
  </div>
);

const BookingDetails = ({ userBookingData }) => (
  <div className="col-lg-8 col-sm-12 text-center mx-auto my-auto overflowMyProfile" style={{overflowY:"auto", height:"80vh"}}>
    {userBookingData.map((movie, index) => {
      const modalId = `modal-${index}`;
      return (
        <div className="container my-4" key={index}>
          <div className="row border p-3">
            <div className="col-4 my-auto">
              <img height={"100%"} width={"100%"} style={{borderRadius:"10px", objectFit:"fill"}} src={`${SERVER_URL}/Uploads/${movie.movieImage}`} alt="" />
            </div>
            <div style={{height:"100%"}} className="col-8 text-start d-grid align-content-space-between justify-content-start my-auto">
              <div>
                <div className='h5 fw-bold'>{movie.userMovieName}</div>
                <div className='fs-6 fw-bold'>{movie.userMovieShowTime}</div>
                <div>{movie.userMovieShowDate}</div>
                <div>Seats: {movie.userMovieSeatNumber}</div>
                <div className='mt-1'>View QR Code:
                  <i data-bs-toggle="modal" data-bs-target={`#${modalId}`} className="fa-solid fa-qrcode ms-4" style={{ color: "#5760f6", cursor: 'pointer', scale: "1.7" }}></i>
                </div>
                <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div style={{backgroundColor:"#5760f6"}} className="modal-content py-4">
                      <QRCode bgColor='#5760f6' value={movie._id} />
                      <div className="text-center mt-1">
                      Show the QR Code before entering the cinema.
                      </div>
                      <div className="my-4">
                        <button style={{backgroundColor:"#0a1e5e"}} type="button" className="btn text-white fs-5 fw-bold" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>

);

export default MyProfile;
