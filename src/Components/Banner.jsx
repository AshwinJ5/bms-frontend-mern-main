import React from 'react'
import { ReactTyped } from 'react-typed'

function Banner() {
  return (
    <div className='w-100'>
        <div className="banners mx-auto ">
    <div>BOOK YOUR</div>
    <div>TICKETS FOR 
    <span >
              <ReactTyped
              strings={[
                ` MOVIES`,
                " SPORTS",
                " EVENTS",
              ]}
              typeSpeed={200}
              backSpeed={200}
              smooth
              loop>
            </ReactTyped>
    </span>
    </div>
    <div className="fonted"> Safe, secure, reliable ticketing.Your ticket to live entertainment!</div>
  </div>
    </div>
  )
}

export default Banner