import React from 'react'
import newsletter from '../Images/footer.png'
import newsLetterImg from '../Images/newslater-bg01.jpg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Newsletter() {
  return (
    <>
    <div className="newslett d-flex pt-5 w-100" id='contact'>
        
        <div className="mainNews w-75 text-center ">
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">

                <div className="h5 fs-5">SUBSCRIBE TO BOOK MY SEAT</div>
            <div className="h2 fs-1 fw-bolder">TO GET EXCLUSIVE BENIFITS</div>
            <InputGroup className="mb-3">
            <Form.Control
            id='newsInput'
            placeholder="Email Address"
            aria-label="Email Address"
            aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
            SUSCRIBE
            </Button>
        </InputGroup>
        <p>We respect your privacy, so we never share your info</p>

                </div>
                <div className="col-lg-2"></div>
            </div>

            
        </div>
    </div>
        {/* <div className="newsletter w-100">
           <img src={newsletter} 
       height={100}
       width={100}
       alt="" />  
       <div className="container text-center">
        <img src={newsLetterImg} alt="" />
       </div>
       <div className='news'>
        <div className="h5">SUSCRIBE TO BOOK MY SEAT</div>
        <div className="h2">TO GET EXCLUSIVE BENIFITS</div>
        <InputGroup className="mb-3">
        <Form.Control
        id='newsInput'
          placeholder="Email Address"
          aria-label="Email Address"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          SUSCRIBE
        </Button>
      </InputGroup>
      <p>We respect your privacy, so we never share your info</p>
    </div>
        </div> */}
       
    </>
  )
}

export default Newsletter