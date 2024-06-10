import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Header from '../Components/Header'
import AdminPageOne from '../Components/AdminPageOne'
import AdminMoviesList from '../Components/AdminMoviesList'
import AdminUsersAll from '../Components/AdminUsersAll';
import AdminBookings from '../Components/AdminBookings';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminPanel() {
  const [basicActive, setBasicActive] = useState('tab1');
  const navigate=useNavigate()

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  const handleAdminLogout=(e)=>{
    const token=sessionStorage.getItem("token")
    const email=sessionStorage.getItem("email")
    if (token && email) {
      Swal.fire({
      title: "Admin Logged Out",
      text: "Bye Admin!",
      icon: "info"
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
    <>
      <style type="text/css">
        {`
          .custom-tab-link.active {
            background-color: #6bd4ac !important;
            font-weight: 800 !important;
            color: black !important; /* Optional: change text color for better contrast */
          }
          .custom-tab-link {
            background-color: transparent !important;
            color: white !important; /* Optional: change text color for better contrast */
          }
        `}
      </style>

      <Header/>
      {/* <div onClick={handleAdminLogout} className='text-end me-5'style={{cursor:"pointer"}}><i class="fa-solid fa-right-from-bracket"></i><a style={{textDecoration:'none',fontWeight:'bolder',color:'#6bd4ac'}} > LOGOUT</a></div>  */}
      
      <MDBTabs style={{backgroundColor:''}} className='mx-3'>
        <MDBTabsItem className='my-3'>
          <MDBTabsLink 
            className={basicActive === 'tab1' ? 'custom-tab-link active' : 'custom-tab-link'}
            onClick={() => handleBasicClick('tab1')} 
            active={basicActive === 'tab1'}>
            Add Movie
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className='my-3'>
          <MDBTabsLink 
            className={basicActive === 'tab2' ? 'custom-tab-link active' : 'custom-tab-link'}
            onClick={() => handleBasicClick('tab2')} 
            active={basicActive === 'tab2'}>
            Manage Movies
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className='my-3'>
          <MDBTabsLink 
            className={basicActive === 'tab3' ? 'custom-tab-link active' : 'custom-tab-link'}
            onClick={() => handleBasicClick('tab3')} 
            active={basicActive === 'tab3'}>
            Bookings
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className='my-3'>
          <MDBTabsLink 
            className={basicActive === 'tab4' ? 'custom-tab-link active' : 'custom-tab-link'}
            onClick={() => handleBasicClick('tab4')} 
            active={basicActive === 'tab4'}>
            Users
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
          <AdminPageOne/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}>
          <AdminMoviesList/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
          <AdminBookings/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab4'}>
          <AdminUsersAll/>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default AdminPanel;
