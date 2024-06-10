import React, { useEffect, useState } from 'react'
import { getAllUsersAPI } from '../Services/allApi';

function AdminUsersAll() {

    
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (token && email)  {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        const result= await getAllUsersAPI(reqHeader)
        if (result.status===200) {
            setAllUsers(result.data)
        } else {
            console.log(result);
        }
    }
  };
    const emailStored = sessionStorage.getItem("email");

  useEffect(() => {
    getAllUsers();
  }, [emailStored]);
//   console.log(allUsers);

  return (
    <div className='moviesOneTwo mt-5 p-3 w-100'>
        <div className='h3 fw-bold mb-3'>Users</div>
        <div className=' mb-3'>Total Users-   <span style={{backgroundColor:'#6bd4ac',color:"black"}} className="badge rounded-pill d-inline">{allUsers.length}</span></div>
        <div  style={{overflowX:'auto'}}>

        <table className="table align-middle mb-5">
  <thead  style={{backgroundColor:"#0a1e5e",position:'sticky',top:'0'}}  className="text-light text-center">
  <tr style={{border:"2px #5760f6 solid"}}>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">No</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">User Id</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">UserName</th>
      <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">E-Mail</th>
      {/* <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Status</th> */}
      {/* <th style={{color:"#6bd4ac"}} className="fw-bolder fs-6 ">Action</th> */}
    </tr>
  </thead>
  <tbody>
  {allUsers.map((user, index) => (

    <tr key={index}  style={{border:"2px #5760f6 solid"}}>
        <td className='text-light'>{index+1}</td>
      <td>
        
            <p className="fw-bold mb-1">{user._id}</p>
            
      </td>
      <td>
        <p className="fw-normal mb-1">{user.username}</p>
       
      </td>
      <td>
        <p className="fw-normal mb-1">{user.email}</p>
       
      </td>
      {/* <td>
        <span style={{backgroundColor:'#6bd4ac',color:"black"}} className="badge rounded-pill d-inline">Active</span>
      </td> */}
     
    </tr>
      ))}
    
  </tbody>
</table>
</div>
    </div>
  )
}

export default AdminUsersAll