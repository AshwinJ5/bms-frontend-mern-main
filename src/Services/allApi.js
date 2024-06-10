import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"


//User register API
export const registerAPI= async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/register`,user,"")
}

//User login API
export const loginAPI= async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/login`,user,"")
}

// Admin login API
export const loginAdminAPI= async(admin)=>{
    return await commonAPI('POST',`${SERVER_URL}/admin/login`,admin,"")
}

// Add movie API
export const addMovieApi= async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/addmovies`,reqBody,reqHeader)
}

// get homemovie API
export const getHomeMoviesAPI= async()=>{
    return await commonAPI('GET',`${SERVER_URL}/landingmovies`,"","")
}

// get all movie API
export const getAllMoviesAPI= async()=>{
    return await commonAPI('GET',`${SERVER_URL}/allmovies`,"","")
}

// delete movie API
export const deleteMoviesAPI= async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/movies/remove/${id}`,{},reqHeader)
}

// get all user details  API
export const getAllUsersAPI= async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/allusers`,"",reqHeader)
}

//get movie detail by id
export const getMovieDetailsByIdAPI= async(id)=>{
    return await commonAPI('GET',`${SERVER_URL}/moviedetails/${id}`,"","")
}

//add movie booking details
export const addMovieBookingDetailsAPI= async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/moviebookingdetails`,reqBody,reqHeader)
}

//get a user detail by id
export const getAUserDetailsAPI= async(id,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/userdetails/${id}`,{},reqHeader)
}

//get a user booking detail by id
export const getUserBookingDetailsAPI= async(id,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/userbooking/${id}`,{},reqHeader)
}
// get all movie booking details API
export const getAllMovieBookingDetailsAPI= async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/allmoviebooking`,"",reqHeader)
}
// get all movie booking data for seat inactivation API
export const getMovieBookingDataSeatsAPI= async()=>{
    return await commonAPI('GET',`${SERVER_URL}/allseatbooking`,"","")
}
// payment
export const paymentByRazorpay= async(amount, currency, receipt)=>{
    return await commonAPI('POST',`${SERVER_URL}/create-order`,{
        amount,
        currency,
        receipt
    })
}

