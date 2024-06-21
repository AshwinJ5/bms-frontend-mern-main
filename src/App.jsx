import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Landing from './Pages/Landing';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AllMovies from './Pages/AllMovies';
import MovieDetails from './Pages/MovieDetails';
import SeatSelection from './Pages/SeatSelection';
import PayMent from './Pages/PayMent';
import Ticket from './Pages/Ticket';
import '@fortawesome/fontawesome-free'
import Authen from './Pages/Authen';
import Loader from './Pages/Loader';
import SelectYourShow from './Pages/SelectYourShow';
import { Fragment, useContext, useEffect, useState } from 'react';
import AdminPanel from './Pages/AdminPanel';
import MyProfile from './Pages/MyProfile';
import Razorpay from './Pages/Razorpay';
import { AuthResponseContext } from './ContextAPI/TokenValidation';


function App() {
  const {isUserAuthorized, setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}=useContext(AuthResponseContext)

  const [pageIsLoaded,setPageIsLoaded]=useState(true)
  const [isLoggedIn,setIsLoggedIn]=useState(false)



  useEffect(()=>{
    (setTimeout(()=>{
      setPageIsLoaded(false)
    },2500))
    if (sessionStorage.getItem("token")) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  },[])
  return (
    <>
    <BrowserRouter>

    {pageIsLoaded?<Loader/>:  
    
    <Fragment>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/movies' element={<AllMovies />}/>
        <Route path='/moviedetails' element={<MovieDetails />}/>
        <Route path='/seats/:id' element={isUserAuthorized?<SeatSelection />:<Navigate to={'/'}/>}/>
        <Route path='/payment/:id' element={isUserAuthorized?<PayMent />:<Navigate to={'/'}/>}/>
        <Route path='/ticket' element={isUserAuthorized?<Ticket />:<Navigate to={'/'}/>}/>
        <Route path='/shows/:id' element={isUserAuthorized?<SelectYourShow />:<Navigate to={'/'}/>}/>
        <Route path='/adminpanel' element={isAdminAuthorized?<AdminPanel />:<Navigate to={'/'}/>}/>
        <Route path='/login' element={<Authen/>}/>
        <Route path='/register' element={<Authen register/>}/>
        <Route path='/admin' element={<Authen admin/>}/> 
        <Route path='/moviedetails/:id' element={isAdminAuthorized?<Navigate to={'/'}/>:<MovieDetails/>}/> 
        <Route path='/myprofile/:id' element={isUserAuthorized?<MyProfile/>:<Navigate to={'/'}/>}/> 
        <Route path='/payment-razorpay/:id' element={<Razorpay/>}/> 
        <Route path='/*' element={<Navigate to={'/'}/>}/>


      </Routes>

      </Fragment>}
    </BrowserRouter>
    </>
  )
}

export default App
