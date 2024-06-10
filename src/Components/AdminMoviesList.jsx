import React, { useContext, useEffect, useState } from 'react';
import { deleteMoviesAPI, getAllMoviesAPI } from '../Services/allApi';
import { addMovieResponseContext } from '../ContextAPI/ContextSharing';
import Swal from 'sweetalert2';
import { SERVER_URL } from '../Services/server_url';

function AdminMoviesList({setMovieData , movieData}) {
  const [landingMovies, setLandingMovies] = useState([]);
  const { addMovieResponse, setAddMovieResponse } = useContext(addMovieResponseContext);

  const getLandingMovies = async () => {
    const result = await getAllMoviesAPI();
    if (result.status === 200) {
      setLandingMovies(result.data);
    } else {
      console.log(result);
    }
  };
  useEffect(() => {
    getLandingMovies();
  }, [addMovieResponse]); 

  const handleDelete = async (mid) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");
      if (token && email ) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        const result = await deleteMoviesAPI(mid, reqHeader);
        if (result.status === 200) {
          Swal.fire("Deleted!", "Your movie has been deleted.", "success");
          getLandingMovies();
        } else {
          Swal.fire("Error!", result.response.data, "error");
        }
      } else {
        Swal.fire("Error!", "You are not authorized to perform this action.", "error");
      }
    }
  };

  return (
    <div className='moviesOneTwo mt-5 p-3 w-100'>
      
      <div className='h3 fw-bold mb-3'>Showing Movie</div>
<div  style={{overflowX:'auto'}}>
      <table className="table align-middle mb-5" >
  <thead  style={{backgroundColor:"#0a1e5e",position:'sticky',top:'0'}} className=" text-center text-light">
    <tr style={{border:"2px #5760f6 solid"}}>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Thumbnail</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Name</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">More</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Screen</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Action</th>
    </tr>
  </thead>
  <tbody>
  {landingMovies.map((movie, index) => (
    <tr key={index} style={{border:"2px #5760f6 solid"}}>
      <td>
          <img
              src={`${SERVER_URL}/Uploads/${movie.movieThumbnail}`}
              alt=""
              style={{width:"55px", height:"45px"}}
              className="rounded-circle"
              />
      </td>
      <td>
          <div className="ms-3">
            <p className="fw-bold mb-1 h6">{movie.movieName}</p>
            <p className="text-muted mb-0">{movie.movieGenre}</p>
          </div>
      </td>
      <td>
        <p className="fw-normal text-capitalize mb-1">{movie.movieLanguage}</p>
        <p className="text-muted mb-0">{movie.movieLength}</p>
      </td>
      <td>
        <span className="badge fs-6 badge-success rounded-pill d-inline">{movie.screensShowing}</span>
      </td>
      <td>
        {/* <AdminEditMovies movie={movie} movieData={movieData} setMovieData={setMovieData} /> */}
      <button onClick={() => handleDelete(movie._id)} className='btn btn-danger btn-sm m-1'>
                  <i className="fa-solid fa-trash-can"></i>
      </button>
      </td>
    </tr>
    
  ))}
    

  </tbody>
</table>
</div>

    </div>
  );
}

export default AdminMoviesList;
