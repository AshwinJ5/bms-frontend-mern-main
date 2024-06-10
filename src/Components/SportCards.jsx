import React from 'react'
import sportData from '../DataBase/sport.json'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';




function SportCards() {
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
   sportData && sportData.map(sport=>{
     return(
       <Col className='px-2'  >
 
     <Card key={sport.id} className='movieCardone d-flex justify-content-around  border border-light   mx-auto my-5' style={{ width: '100%' , minHeight:"30vh",borderRadius:"18px"}}>
     <div className="ribbon">{sport.date}</div>

       <Card.Img variant="top"
        src={sport.image} 
        height={"250vh"}
        width={"100vh"}
        />
       <Card.Body className='movieCardone  w-100 text-center align-items-center d-grid'>
         <Card.Title className='fw-bold px-1'>{sport.title}</Card.Title> <hr />
         <Card.Text className=' justify-content-space-between'>
         <div className='text-center' >₹ {sport.ticket}/- onwards</div>
         </Card.Text>
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

export default SportCards