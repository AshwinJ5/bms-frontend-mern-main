import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import eventData from '../DataBase/event.json'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function EventCards() {
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
        <div className="moviesCardTwo py-5 w-100" id='event'>
     <div className="row moviesOneTwo mx-auto ">
        <div className="col-lg-6 ">
            <div style={{fontWeight:'900'}} className='fs-1'>EVENTS</div>
            <p className='fs-5'>Be sure not to miss these Events today.</p>

        </div>
        <div className="col-lg-6 text-end my-auto">
            <div className="btn movieButtons rounded-pill text-light">EXPLORE MORE</div>
        </div>
     </div>

     <Row className="movies mx-auto container">
     <OwlCarousel className='owl-theme' {...options}  >
 {
   eventData && eventData.map(event=>{
     return(
       <Col className='px-2'  >
     <Card key={event.id} className='movieCardone d-flex justify-content-space-around me-2 border border-light   mx-auto my-5' style={{ width: '100%' , minHeight:"30vh",borderRadius:"18px"}}>
     <div className="ribbon">{event.date}</div>

       <Card.Img variant="top"
        src={event.image} 
        height={"250vh"}
        width={"100vh"}
        />
       <Card.Body className='movieCardone  w-100 text-center align-items-center d-grid'>
         <Card.Title className='aj'>{event.title}</Card.Title> <hr />
         <Card.Text className=' d-block justify-content-space-between'>
         <div className='text-center' >₹ {event.ticket}/- onwards</div>
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

export default EventCards