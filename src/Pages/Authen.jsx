import React, { useContext, useState } from 'react'
import { FaLock,FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Swal from 'sweetalert2'
import { loginAPI, loginAdminAPI, registerAPI } from '../Services/allApi';
import { AuthResponseContext } from '../ContextAPI/TokenValidation';

function Authen({register, admin}) {
    const {isUserAuthorized, setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}=useContext(AuthResponseContext)


    const isRegisterForm=register?true:false
    const isAdminForm=admin?true:false
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })
    const [adminData,setAdminData]=useState({
        email:"",password:""
    })
    const navigate=useNavigate()
    // console.log(userData);

    const handleRegister=async(e)=>{
        e.preventDefault()
        // console.log(userData);
        const{username,email,password}=userData
        if (!username || !email || !password) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill all fields",
              });
        } else {
            const result = await registerAPI(userData)
            // console.log(result);
            if(result.status===200){
                Swal.fire({
                    title: "Registration Successful",
                    text: "Now Please Login",

                    icon: "success",
                    timer: 1500
                  });
                  setUserData({
                    email:"",password:"",username:""
                  })
                  setTimeout(()=>{
                      navigate('/login')
                  },2000)
            }else{
                alert(result.response.data)
            }
        }
    }
    const handleLogin= async(e)=>{
        e.preventDefault()
        // console.log(userData);
        const{email,password}=userData
        if ( !email || !password) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill all fields",
              });
        } else {
            const result = await loginAPI({email,password})
            console.log(result);
            if(result.status===200){
                sessionStorage.setItem("username",result.data.existingUser.username)
                sessionStorage.setItem("token",result.data.token)
                sessionStorage.setItem("userId",result.data.existingUser._id)
                setIsUserAuthorized(true)
                  setUserData({
                    email:"",password:""
                  })
                  Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                  });
                  setTimeout(() => {
                    navigate('/')
                  }, 2000);
                
            }else{
                alert(result.response.data)
            }
            
        }
    }
    const handleAdminLogin= async(e)=>{
            e.preventDefault()
            const{email,password}=adminData
            if ( !email || !password) {
                Swal.fire({
                    title: "Missing Fields!",
                    text: "Please fill all fields",
                  });
            } else {
                const result=await loginAdminAPI({email,password})
                // console.log(result);
                if (result.status===200) {
                    sessionStorage.setItem("email",result.data.existingAdmin.email)
                    sessionStorage.setItem("token",result.data.token)
                    setIsAdminAuthorized(true)
                    setAdminData({
                        email:"",password:""
                    })
                    Swal.fire({
                        title: "Login Successful",
                        text: "Hello Admin!",
                        icon: "success"
                      });
                      setTimeout(() => {
                        navigate('/adminpanel')
                      }, 2000);
                    
                } else {
                   Swal.fire(result.response.data) 
                }
            }
    }
      return (
    <>
            <Header/>
            {isRegisterForm?null:isAdminForm?null:<div className='text-end me-5'>Are you an<a style={{textDecoration:'none',fontWeight:'bolder',color:'#6bd4ac'}} href='/admin'> Admin</a>?</div> }
            
    <div className="w-100 body">

        <div className="wrapper">
            <form action="">
                <Link to={'/'}>
                <h1 style={{color:"#6bd4ac"}}>BOOK MY SEATS</h1>
                </Link>
                { isRegisterForm&&<div className="input-box">
                    <input type="text" placeholder='Username' onChange={(e)=>setUserData({...userData,username:e.target.value})} value={userData.username} required/><FaUser className='icon' />
                </div>}
                {isAdminForm?
                <span>
                    <div className='h6 fw-bold text-center'>ADMIN LOGIN</div>
                <div className="input-box">
                    <input type="text"  onChange={(e)=>setAdminData({...adminData,email:e.target.value})} value={adminData.email}  placeholder='Email Address' required/><IoIosMail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password"  onChange={(e)=>setAdminData({...adminData,password:e.target.value})} value={adminData.password}   placeholder='Password' required/><FaLock className='icon'/>
                </div>
                </span>
                : 
                <span>
                <div className="input-box">
                    <input type="text" placeholder='Email Address' onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email}  required/><IoIosMail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password}  required/><FaLock className='icon'/>
                </div>
                </span>}
                {/* } */}
                {/* <div className="remember-forgot">
                    <label> <input type="checkbox" />Remember Me</label>
                </div> */}
               { isRegisterForm?
                <span>
                <button type='submit' onClick={handleRegister} className='text-uppercase'>Register</button>
                <div className="register-link">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                </span>:
                isAdminForm ?
                <span>
                    <Link to={'/adminpanel'}>
                <button type='submit' onClick={handleAdminLogin}  className='text-uppercase'>Admin Login</button>
                </Link>
                <div className="register-link">
                    <p>Are you an user? <a href="/login">Login</a></p>
                </div>
                </span>
            :    
            <span>
                <button type='submit' onClick={handleLogin} className='text-uppercase'>Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
                </span>}
            </form>
        </div>
        </div>
    </>
  )
}

export default Authen