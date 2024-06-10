import React from 'react'
import {Triangle } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='loader'>
            
  <Triangle
  visible={true}
  height="80"
  width="80"
  color="#6bd4ac"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}

export default Loader