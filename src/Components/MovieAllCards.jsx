import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { MDBRadio } from 'mdb-react-ui-kit'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAllMoviesAPI } from '../Services/allApi'
import { SERVER_URL } from '../Services/server_url'

 function  MovieAllCards() {
    const [selectedOption,setSelectedOption]=useState("all")

      // Function to handle radio button change
  const  handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const [allMovies, setAllMovies] = useState([]);

  const getAllMovies = async () => {
    const result = await getAllMoviesAPI();
    if (result.status === 200) {
      setAllMovies(result.data);
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  // Filtering based on selection
  const  filteredData =  selectedOption === 'all' ? allMovies : allMovies.filter(item => item.movieLanguage === selectedOption);

  return (
    <>

    <div className="allmovieCard moviesOneTwo py-5 w-100">
    <div className="row moviesOneTwo mx-auto ">
        <div className="col text-start ">
            <div style={{fontWeight:'900'}} className='fs-1'>MOVIES</div>

        </div>
     </div>
    <div >
        <div className=' text-center'>
            <span className='me-3 '> Languages :</span>
      <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' checked={selectedOption === 'all'} value="all" label='All 'inline defaultChecked onChange={handleOptionChange} />
      <MDBRadio name='flexRadioDefault' id='flexRadioDefault2' checked={selectedOption === 'english'}  value='english' label='English' inline onChange={handleOptionChange}/>
      <MDBRadio name='flexRadioDefault' id='flexRadioDefault3' checked={selectedOption === 'hindi'}  value='hindi' label='Hindi' inline onChange={handleOptionChange}/>
      <MDBRadio name='flexRadioDefault' id='flexRadioDefault4' checked={selectedOption === 'malayalam'} value='malayalam' label='Malayalam' inline onChange={handleOptionChange}/>
    </div>

       
       
     </div>

    <div className="movies row mx-auto container">

     
 { filteredData && filteredData.map(movie=>{
    return(
      <Col lg={4}  md={6} sm={12} xl={3} >
<Link to={`/moviedetails/${movie._id}`}>
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:1.5}}
    layout
    key={movie._id} className='card movieCardone d-flex justify-content-around  border border-light   mx-auto my-5' style={{ width: '17rem' }}>
<div className="cards">
  <img width={'100%'} src={`${SERVER_URL}/Uploads/${movie.movieThumbnail}`} alt="" />
  <div style={{overflowY:"auto"}} className="overlayOne px-3 py-5">
    
    <div style={{color:'#6bd4ac', textAlign:'center'}} className='h3 pb-2 fw-bold'>{movie.movieName}</div>
    
    <p style={{textAlign:"justify"}}>{movie.movieAbout.slice(0,200)} .....</p>
  </div>
  
</div>
    </motion.div>
    </Link>
    </Col>

    )
  })
}</div>
    
    </div>

    </>
  )
}

export default MovieAllCards