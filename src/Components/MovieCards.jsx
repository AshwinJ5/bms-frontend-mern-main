// import React, { useEffect, useState } from 'react';
// import Card from 'react-bootstrap/Card';
// import { Col, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { getHomeMoviesAPI } from '../Services/allApi';
// import { SERVER_URL } from '../Services/server_url';

// function MovieCards() {
//   const options = {
//     loop: true,
//     items: 1,
//     autoplay: true,
//     autoplayTimeout: 2500,
//     nav: false,
//     dots: false,
//     animateOut: 'slideOutUp',
//     margin: 0,
//     autoplayHoverPause: true,
//     responsive: {
//       0: {
//         items: 1.5,
//       },
//       768: {
//         items: 2.5,
//       },
//       1000: {
//         items: 4,
//       },
//     },
//   };

//   const [landingMovie, setLandingMovie] = useState([]);

//   const getLandingMovie = async () => {
//     const result = await getHomeMoviesAPI();
//     if (result.status === 200) {
//       setLandingMovie(result.data);
//     } else {
//       console.log(result);
//     }
//   };

//   useEffect(() => {
//     getLandingMovie();
//   }, []); // Empty dependency array ensures this runs once on mount

//   return (
//     <>
//       <div id="movie" className="moviesCardTwo py-5 w-100">
//         <div className="row moviesOneTwo mx-auto w-100 ">
//           <div className="col-lg-6 col-sm-12">
//             <div style={{ fontWeight: '900' }} className="fs-1">MOVIES</div>
//             <p className="fs-5">Be sure not to miss these Movies today.</p>
//           </div>
//           <div className="col-lg-6 col-sm-12 text-end my-auto">
//             <Link to={'/movies'}>
//               <div className="btn movieButtons rounded-pill text-light">EXPLORE MORE</div>
//             </Link>
//           </div>
//         </div>

//         <Row className="movies mx-auto container">
//           <OwlCarousel className="owl-theme" {...options}>
//             {landingMovie && landingMovie.slice(landingMovie.length - 4).map(movie => (
//               <Col className="px-2" key={movie._id}>
//                 <Link to={`/moviedetails/${movie._id}`}>
//                   <Card className="movieCardone d-flex justify-content-space-around me-2 border border-light mx-auto my-5" style={{ width: '100%', minHeight: "30vh", borderRadius: "18px" }}>
//                     <Card.Img
//                       variant="top"
//                       src={`${SERVER_URL}/Uploads/${movie.movieThumbnail}`}
//                       height={"280"}
//                       width={"100vh"}
//                     />
//                     <Card.Body className="movieCardone w-100 text-center align-items-center d-grid">
//                       <p className="fw-bold">{movie.movieName.slice(0, 15)}</p>
//                     </Card.Body>
//                   </Card>
//                 </Link>
//               </Col>
//             ))}
//           </OwlCarousel>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default MovieCards;


import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { SERVER_URL } from '../Services/server_url';
import { getHomeMoviesAPI } from '../Services/allApi';




function MovieCards() {
  const options={
    loop:true,
    items:1,
    autoplay:true,
    autoplayTimeout:2500,
    nav:false,
    dots:false,
    animateOut:'slideOutUp',
    margin:0,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1.5
        },
        768:{
            items:2.5
        },
        1000:{
            items:4
        }
    }
}
  const [landingMovie, setLandingMovie] = useState([]);

  const getLandingMovie = async () => {
    const result = await getHomeMoviesAPI();

    if (result.status === 200) {
      setLandingMovie(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getLandingMovie();
  }, []); 

  return (
    <>
    <div className="moviesCards py-5 w-100" id='sport'>
    <div className="row moviesOneTwo mx-auto w-100 ">
        <div className="col-lg-6 col-sm-12">
            <div style={{fontWeight:'900'}} className='fs-1'>SPORTS</div>
            <p className='fs-5'>Be sure not to miss these Sports today.</p>

        </div>
        <div className="col-lg-6 col-sm-12 text-end my-auto">
            <div className="btn movieButtons rounded-pill text-light">EXPLORE MORE</div>
        </div>
     </div>

     <Row className="movies mx-auto container">
     <OwlCarousel className='owl-theme' {...options}  >
      
 {
   landingMovie && landingMovie.map(sport=>{
     return(
       <Col className='px-2'  >
 
     <Card key={sport._id} className='movieCardone d-flex justify-content-around  border border-light   mx-auto my-5' style={{ width: '100%' , minHeight:"30vh",borderRadius:"18px"}}>
     <div className="ribbon">{sport.date}</div>

       <Card.Img variant="top"
        src={`${SERVER_URL}/Uploads/${sport.movieThumbnail}`} 
        height={"250vh"}
        width={"100vh"}
        />
       <Card.Body className='movieCardone  w-100 text-center align-items-center d-grid'>
         <Card.Title className='fw-bold px-1'>{sport.movieName.slice(0, 15)}</Card.Title> 
         {/* <hr /> */}
         {/* <Card.Text className=' justify-content-space-between'>
         <div className='text-center' >₹ {sport.ticket}/- onwards</div>
         </Card.Text> */}
       </Card.Body>
     </Card>
     </Col>
 
     )
   })
 }
 </OwlCarousel>      

     </Row>
     </div>
    </>
  )
}

export default MovieCards