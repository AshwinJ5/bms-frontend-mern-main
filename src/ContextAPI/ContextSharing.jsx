import React, { createContext, useState } from 'react'
export const addMovieResponseContext=createContext()
export const movieBookingDetailsContext=createContext()


function ContextSharing({children}) {
    const[addMovieResponse,setAddMovieResponse]=useState("")
    const [movieBookingDetails,setMovieBookingDetails]= useState({
      movieId:"",
      userMovieName:"",
      userMovieShowDate:"",
      userMovieShowTime:"",
      userMovieSeatNumber:[],
      userNumberOfSeats:"",
      userTicketAmount:"",
      userId:"",
      movieImage:""
  })
  return (
    <>
        <addMovieResponseContext.Provider value={{addMovieResponse,setAddMovieResponse}}>
        <movieBookingDetailsContext.Provider value={{movieBookingDetails,setMovieBookingDetails}}>
        {children}
        </movieBookingDetailsContext.Provider>
        </addMovieResponseContext.Provider>
    </>
  )
}

export default ContextSharing