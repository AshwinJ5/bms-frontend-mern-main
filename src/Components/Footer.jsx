import React from 'react';
import logo from '../Images/logo.png';

function Footer() {
  return (
    <div className="footer py-5 fs-5 w-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center my-auto">
            <img src={logo} width="70" height="60" alt="Logo" /> BOOK MY SEAT
          </div>
          <div className="col-lg-6 w-500 footerFirst text-end my-5">
                <button className="me-3 "><i className="fa-brands fa-facebook"></i></button>
                <button className="me-3 "><i className="fa-brands fa-x-twitter"></i></button>
                <button className="me-3 "><i className="fa-brands fa-instagram"></i></button>
                <button className="me-3 "><i className="fa-brands fa-pinterest"></i></button>
                <button className="me-3 "><i className="fa-brands fa-google"></i></button>
                
            </div>
        </div>

        <hr className='horizontal' />

        <div className="row my-5">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mb-4">
            <span>Copyright © 2024. All Rights Reserved By: <span>BookMySeat</span></span>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 footerSecond  text-center">
            <a href="/" className="me-3">About</a>
            <a href="/" className="me-3">Terms of Use</a>
            <a href="/" className="me-3">Privacy Policy</a>
            <a href="/" className="me-3">FAQ</a>
            <a href="/" className="me-3">Feedback</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
