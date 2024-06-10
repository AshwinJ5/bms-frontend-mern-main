import React, { useEffect, useState } from 'react';
import logo from '../Images/logo.png';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



function Header() {
  const navigate=useNavigate()
  const [usersId,setUsersId]=useState("")
  const [loginButton,setLoginButton]=useState(false)
  const [logoutAdminButton,setLoginAdminButton]=useState(false)



  useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const userIdOfLoggedIn=sessionStorage.getItem("userId")
    setUsersId(userIdOfLoggedIn)
    if(userIdOfLoggedIn){
      setLoginButton(true)
    }
  })

  useEffect(()=>{
    const userIdOfLoggedInAdmin=sessionStorage.getItem("email")
    if(userIdOfLoggedInAdmin){
      setLoginAdminButton(true)
    }
  })

  const [openBasic, setOpenBasic] = useState(false);

  const handleAdminLogout=(e)=>{
    const token=sessionStorage.getItem("token")
    const email=sessionStorage.getItem("email")
    if (token && email) {
      Swal.fire({
      title: "Admin Logged Out ",
      text: "Bye Admin!",
      icon: "success"
      });
      sessionStorage.clear()
      setTimeout(()=>{
        navigate('/')
      },2000)
    } else {
      Swal.fire({
      title: "Admin Not Logged In",
      icon: "error"
    });
    setTimeout(()=>{
      navigate('/')
    },2000)
    }
    
  }
  return (
<MDBNavbar expand='lg' light className='navbarManidiv'   >
      <MDBContainer fluid className=' fs-5  fw-normal text-light '>
        <MDBNavbarBrand style={{fontWeight:'900'}} href='/' className='text-light  mx-auto  fs-3 '>
          <img
            src={logo}
            width="70"
             height="60"
            className="d-inline-block align-top"
            alt="Logo"
           />{' '}BOOK MY SEAT</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar className='' open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 text-center justify-content-space-around text-light'>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light ' active aria-current='page' href='/'>
              HOME
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light' href='#movie'>MOVIES</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light' href='#sport'>SPORTS</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light' href='#event'>EVENTS</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light' href='#contact'>CONTACT</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            {loginButton?
              <Link to={`/myprofile/${usersId}`}>
                  <MDBNavbarLink  className='text-light ms-5 fw-bolder' >MY PROFILE</MDBNavbarLink>
              </Link>
              :
               logoutAdminButton
               ?
               <div onClick={handleAdminLogout} style={{cursor:'pointer'}}>
                  <MDBNavbarLink style={{borderRadius:"50px"}} className='text-light ms-5 fw-bolder' ><i class="fa-solid fa-right-from-bracket"></i><a style={{textDecoration:'none',fontWeight:'bolder',color:'#6bd4ac'}} > LOGOUT</a></MDBNavbarLink>
              </div>
              :
              <Link to={`/login`}>
                  <MDBNavbarLink style={{borderRadius:"50px"}} className='text-light ms-5 navButton px-5 py-2 fs-6  fw-bolder' >JOIN NOW</MDBNavbarLink>
              </Link>
            }
            </MDBNavbarItem>
            
            
          </MDBNavbarNav>

          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>


   
  )
}

export default Header;
