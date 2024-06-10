import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { getMovieDetailsByIdAPI } from '../Services/allApi'
import { SERVER_URL } from '../Services/server_url';
import Swal from 'sweetalert2';

function IndividualMovie({id}) {

// console.log(id);

const [singleMovies, setSingleMovies] = useState([]);
const navigate=useNavigate()

const getSingleMovies=async(mid)=>{
    const result =await getMovieDetailsByIdAPI(mid)
    if(result.status===200){
        setSingleMovies(result.data)
    }
}
// console.log(singleMovies);

    useEffect(() => {
        getSingleMovies(id);
    }, []);
    
    //date format
const date=new Date(singleMovies.releaseDate)
date.setHours(0,0,0,0);
const dateWithoutTime = date.toDateString().slice(4,15)
// console.log(dateWithoutTime);


const getTicket=()=>{
    const userName=sessionStorage.getItem("username")
    const token=sessionStorage.getItem("token")
    if (token && userName) {
        navigate(`/shows/${singleMovies._id}`)
    } else {
        Swal.fire({
            title: "Please Login",
            text: "Login to continue",
            icon: "info"
          });
          setTimeout(() => {
            navigate('/login')
          }, 2000);
    }
}

  return (
    <>
    <div style={{fontWeight:'900'}} className="moviesOneTwo px-3  w-100 py-5 text-uppercase mx-auto fs-1">
        
        <div className='MovieTitle glow'>{singleMovies.movieName}</div>
        <div style={{fontWeight:'300'}} className='fs-6'>{singleMovies.movieGenre} / {singleMovies.movieLength}</div>
        <div onClick={getTicket} className='btn navButton  d-inline-block text-light rounded-pill'>GET YOUR TICKETS</div>
        
    </div>
<div   className=" individualMovie ">
<img src={`${SERVER_URL}/Uploads/${singleMovies.moviePoster}`}   width={"100%"} />
    <div className="row moviesOneTwo mx-auto py-5  w-100">
        
        <div className="col-lg-4 py-4 my-auto  movieGetDetails col-md-12 col-sm-12 text-center ">
            <img className=' img1 mx-auto' src={`${SERVER_URL}/Uploads/${singleMovies.movieThumbnail}`} height={"400"} width={'300'} alt="" />
        <div className='fs-lighter asdfgh  pt-5'>
            <span style={{color:"#6bd4ac"}} className='fs-1 fw-bolder'>{singleMovies.movieName}</span>
        <div id='movieDet'> Genere:<span className='fs-bolder'> {singleMovies.movieGenre}</span></div>
        <div id='movieDet'>Time: <span className='fs-bolder'>{singleMovies.movieLength}</span></div>
        <div id='movieDet'>Released on: <span className='fs-bolder'>{dateWithoutTime}</span></div>
        </div>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 my-auto py-4 text-center">
            <div className="fs-5 p-3 text-end ">Trailer</div>
        <iframe className='text-center ' width="100%" height="500" src={singleMovies.movieTrailer} allowFullScreen></iframe>
        </div>
    </div>
    <div style={{textAlign:'justify'}} className="moviesOneTwo p-3 ">
    <div className='fs-2 fw-bolder mb-3'>About the movie</div>
    <p>{singleMovies.movieAbout}</p>
    <br /><hr />
    </div>
</div>
    </>
  )
}

export default IndividualMovie