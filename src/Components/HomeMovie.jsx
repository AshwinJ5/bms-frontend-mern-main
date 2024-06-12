import React, { useEffect, useState } from 'react'
import sportData from '../DataBase/sport.json'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getHomeMoviesAPI } from '../Services/allApi';
import { SERVER_URL } from '../Services/server_url';
import { Link } from 'react-router-dom';




function HomeMovie() {
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

// console.log(landingMovie);

  return (
    <>
    <div className="moviesCards py-5 w-100" id='sport'>
    <div className="row moviesOneTwo mx-auto w-100 ">
        <div className="col-lg-6 col-sm-12">
            <div style={{fontWeight:'900'}} className='fs-1'>MOVIES</div>
            <p className='fs-5'>Be sure not to miss these Movies today.</p>

        </div>
        <div className="col-lg-6 col-sm-12 text-end my-auto">
        <Link to={'/movies'}>
              <div className="btn movieButtons rounded-pill text-light">EXPLORE MORE</div>
            </Link>
        </div>
     </div>

     <Row className="movies mx-auto container">
     <OwlCarousel className='owl-theme' {...options}  >
      
 {
   landingMovie && landingMovie.map(movie=>{
     return(
       <Col className='px-2'   >
 <Link to={`/moviedetails/${movie._id}`}>
     <Card key={movie.id} className='movieCardone d-flex justify-content-around  border border-light   mx-auto my-5' style={{ width: '100%' , minHeight:"30vh",borderRadius:"18px"}}>
     <div className="ribbon">{sport.date}</div>

       <Card.Img variant="top"
        src={`${SERVER_URL}/Uploads/${movie.movieThumbnail}`} 
        height={"250vh"}
        width={"100vh"}
        />
       <Card.Body className='movieCardone  w-100 text-center align-items-center d-grid'>
         <p className='fw-bolder'>{movie.movieName.slice(0,15)}</p>
       </Card.Body>
     </Card>
     </Link>
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

export default HomeMovie