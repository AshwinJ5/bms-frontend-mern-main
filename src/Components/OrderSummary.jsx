import React, { useContext, useEffect, useState } from 'react';
import { movieBookingDetailsContext } from '../ContextAPI/ContextSharing';
import { addMovieBookingDetailsAPI, getMovieDetailsByIdAPI, paymentByRazorpay } from '../Services/allApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function OrderSummary({ id }) {
    const [singleMovie, setSingleMovie] = useState({});
    const { movieBookingDetails, setMovieBookingDetails } = useContext(movieBookingDetailsContext);
    const [usersId, setUsersId] = useState("");

    useEffect(() => {
        const savedDetails = localStorage.getItem('movieBookingDetails');
        if (savedDetails) {
            setMovieBookingDetails(JSON.parse(savedDetails));
        }

        const fetchMovieDetails = async () => {
            try {
                const result = await getMovieDetailsByIdAPI(id);
                if (result.status === 200) {
                    setSingleMovie(result.data);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id, setMovieBookingDetails]);

    const navigate = useNavigate();

    useEffect(() => {
        const userIdOfLoggedIn = sessionStorage.getItem("userId");
        setUsersId(userIdOfLoggedIn);
    }, []);

    useEffect(() => {
        if (movieBookingDetails.userMovieSeatNumber) {
            const seatCount = movieBookingDetails.userMovieSeatNumber.length;
            const ticketPrice = 200;
            const vas = 36;
            const totalAmount = seatCount * (ticketPrice + vas);

            setMovieBookingDetails((prevDetails) => ({
                ...prevDetails,
                userTicketAmount: totalAmount,
            }));
        }
    }, [movieBookingDetails.userMovieSeatNumber, setMovieBookingDetails]);

    const proceedToPay = async () => {
        const {
            movieId,
            userMovieName,
            userMovieShowDate,
            userMovieShowTime,
            userMovieSeatNumber,
            userNumberOfSeats,
            userTicketAmount,
            userId,
            movieImage
        } = movieBookingDetails;

        if (!movieId || !userMovieName || !userMovieShowDate || !userMovieShowTime || !userMovieSeatNumber || !userNumberOfSeats || !userTicketAmount || !userId || !movieImage) {
            Swal.fire({
                title: "Missing Data",
                text: "Please select preferred date, time, and seats.",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const reqBody = new FormData();
        reqBody.append("movieId", movieId);
        reqBody.append("userMovieName", userMovieName);
        reqBody.append("userMovieShowDate", userMovieShowDate);
        reqBody.append("userMovieShowTime", userMovieShowTime);
        reqBody.append("userMovieSeatNumber", userMovieSeatNumber);
        reqBody.append("userNumberOfSeats", userNumberOfSeats);
        reqBody.append("userTicketAmount", userTicketAmount);
        reqBody.append("userId", userId);
        reqBody.append("movieImage", movieImage);

        const token = sessionStorage.getItem("token");
        const userName = sessionStorage.getItem("username");
        if (token && userName) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`,
            };
            try {
                const result = await addMovieBookingDetailsAPI(reqBody, reqHeader);

                if (result.status === 200) {
                    const order = await paymentByRazorpay(userTicketAmount * 100, 'INR', `receipt_${Math.random().toString(36).substring(7)}`);

                    const options = {
                        key: 'rzp_test_ETNHrYLVBSuAXf',
                        amount: order.data.amount,
                        currency: order.data.currency,
                        name: 'BOOKY MY SEATS',
                        description: 'Movie Ticket Purchase',
                        order_id: order.data.id,
                        handler: function (response) {
                            Swal.fire({
                                title: "Payment Successful!",
                                text: `Payment ID: ${response.razorpay_payment_id}`,
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                            navigate(`/myprofile/${usersId}`);
                        },
                        prefill: {
                            name: userName,
                            email: 'test@example.com',
                            contact: '9999999999'
                        },
                        notes: {
                            address: 'Razorpay Corporate Office'
                        },
                        theme: {
                            color: '#3399cc'
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: result.response.data,
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    navigate(`/myprofile/${usersId}`);
                }
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error);
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while adding movie details.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire("User not logged in!", "Please login to perform this action.");
        }
    };

    const seatCount = movieBookingDetails.userMovieSeatNumber ? movieBookingDetails.userMovieSeatNumber.length : 0;
    const ticketPrice = 200 * seatCount;
    const vas = 36 * seatCount;
    const totalAmount = movieBookingDetails.userTicketAmount || 0;

    return (
        <div className="w-100 orderSummaryDiv p-5">
            <div className="fs-2 text-center fw-bolder">BOOKING SUMMARY</div>
            <hr className="w-100 mx-auto my-3" />
            <div className="fs-5 text-uppercase fw-bold my-3">{movieBookingDetails.userMovieName}</div>
            <p className="text-uppercase">{singleMovie.movieLanguage}</p>
            <div className="row my-3">
                <div className="fs-5 col-6 text-uppercase text-start fw-bold my-3">
                    Screen-{singleMovie.screensShowing}
                </div>
                <div className="fs-5 col-5 text-uppercase text-end fw-bold my-3">
                    {seatCount}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-6 text-uppercase fw-bolder text-start">
                    {movieBookingDetails.userMovieShowDate?.slice(0, 6)}
                    <span className="ms-2">{movieBookingDetails.userMovieShowTime}</span>
                </div>
                <div className="col-6 text-uppercase text-end">tickets</div>
            </div>
            <div className="row my-3">
                <div className="col-6 fw-bolder text-start">
                    {movieBookingDetails.userMovieSeatNumber[0]}  <span className='mx-2'>{movieBookingDetails.userMovieSeatNumber[1]}</span> {movieBookingDetails.userMovieSeatNumber[2]} <span className='ms-3'>{movieBookingDetails.userMovieSeatNumber[3]}</span>
                </div>
                <div className="col-6 text-uppercase text-end">seats</div>
            </div>
            <div className="row my-3">
                <div className="fs-5 col-6 text-uppercase text-start fw-bold my-3">Price</div>
                <div className="fs-5 col-5 text-uppercase text-end fw-bold my-3">
                    ₹ {ticketPrice}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-6 text-uppercase text-start">VAS (18%)</div>
                <div className="col-6 text-uppercase text-end">
                    ₹ {vas}
                </div>
            </div>
            <hr className="w-100 mx-auto my-4" />
            <div className="row my-3">
                <div className="fs-5 col-6 text-uppercase text-start fw-bold my-3">Amount</div>
                <div className="fs-5 col-5 text-uppercase text-end fw-bold my-3">
                    ₹ {totalAmount}/-
                </div>
            </div>
            <div className="text-center">
                <div onClick={proceedToPay} className="navButton btn rounded-pill text-light">
                    Proceed to Pay
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
