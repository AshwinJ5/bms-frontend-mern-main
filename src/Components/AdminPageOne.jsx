import React, { useContext, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { addMovieApi } from '../Services/allApi';
import { addMovieResponseContext } from '../ContextAPI/ContextSharing';

function AdminPageOne() {
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [posterPreview, setPosterPreview] = useState("");
    const { addMovieResponse, setAddMovieResponse } = useContext(addMovieResponseContext);

    const thumbnailInputRef = useRef(null);
    const posterInputRef = useRef(null);
    const youtubeRef = useRef(null);

    const [movieData, setMovieData] = useState({
        movieName: "", 
        releaseDate: "", 
        movieLength: "", 
        movieLanguage: "", 
        rottenRating: "", 
        imdbRating: "", 
        movieGenre: "", 
        movieThumbnail: "", 
        moviePoster: "", 
        movieTrailer: "", 
        movieFrom: "", 
        movieTo: "", 
        screensShowing: "", 
        movieAbout: ""
    });
// console.log(movieData);
    const getYoutubeEmbed = (e) => {
        const { value } = e.target;
        if (value.includes('v=')) {
            const videoID = value.split('v=')[1].slice(0, 11);
            setMovieData({ ...movieData, movieTrailer: `https://www.youtube.com/embed/${videoID}` });
        } else {
            setMovieData({ ...movieData, movieTrailer: "" });
        }
    }

    const addAllMovieDetails = async () => {
        const { movieName, releaseDate, movieLength, movieLanguage, rottenRating, imdbRating, movieGenre, movieThumbnail, moviePoster, movieTrailer, movieFrom, movieTo, screensShowing, movieAbout } = movieData;
        if (!movieName || !releaseDate || !movieLength || !movieLanguage || !rottenRating || !imdbRating || !movieGenre || !movieThumbnail || !moviePoster || !movieTrailer || !movieFrom || !movieTo || !screensShowing || !movieAbout) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill all fields",
                timer: "2000",
                showConfirmButton: false,
            });
        } else {
            const reqBody = new FormData();
            reqBody.append("movieName", movieName);
            reqBody.append("releaseDate", releaseDate);
            reqBody.append("movieLength", movieLength);
            reqBody.append("movieLanguage", movieLanguage);
            reqBody.append("rottenRating", rottenRating);
            reqBody.append("imdbRating", imdbRating);
            reqBody.append("movieGenre", movieGenre);
            reqBody.append("movieThumbnail", movieThumbnail);
            reqBody.append("moviePoster", moviePoster);
            reqBody.append("movieTrailer", movieTrailer);
            reqBody.append("movieFrom", movieFrom);
            reqBody.append("movieTo", movieTo);
            reqBody.append("screensShowing", screensShowing);
            reqBody.append("movieAbout", movieAbout);

            const token = sessionStorage.getItem("token");
            const email = sessionStorage.getItem("email");
            if (token && email ) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                try {
                    const result = await addMovieApi(reqBody, reqHeader);
                    if (result.status === 200) {
                        Swal.fire({
                            title: "Success!",
                            text: "Movie details added successfully",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        setMovieData({
                            movieName: "", 
                            releaseDate: "", 
                            movieLength: "", 
                            movieLanguage: "", 
                            rottenRating: "", 
                            imdbRating: "", 
                            movieGenre: "", 
                            movieThumbnail: "", 
                            moviePoster: "", 
                            movieTrailer: "", 
                            movieFrom: "", 
                            movieTo: "", 
                            screensShowing: "", 
                            movieAbout: ""
                        });
                        setThumbnailPreview("");
                        setPosterPreview("");
                        setAddMovieResponse(result.data);

                        if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
                        if (posterInputRef.current) posterInputRef.current.value = "";
                        if (youtubeRef.current) youtubeRef.current.value = "";
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: result.response.data,
                            icon: "error",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while adding movie details",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } else {
                Swal.fire("Admin not logged in!", "You are not authorized to perform this action.");
            }
        }
    }

    useEffect(() => {
        if (movieData.movieThumbnail.type === 'image/jpeg' || movieData.movieThumbnail.type === 'image/jpg' || movieData.movieThumbnail.type === 'image/png') {
            setThumbnailPreview(URL.createObjectURL(movieData.movieThumbnail));
        } else {
            setThumbnailPreview('');
            setMovieData({ ...movieData, movieThumbnail: "" });
        }
    }, [movieData.movieThumbnail]);

    useEffect(() => {
        if (movieData.moviePoster.type === 'image/jpeg' || movieData.moviePoster.type === 'image/jpg' || movieData.moviePoster.type === 'image/png') {
            setPosterPreview(URL.createObjectURL(movieData.moviePoster));
        } else {
            setPosterPreview('');
            setMovieData({ ...movieData, moviePoster: "" });
        }
    }, [movieData.moviePoster]);


    return (
        <>
            <div className="moviesOneTwo mt-5 p-3">
                <div className='mx-auto'>
                    <div className='h3 fw-bold '>Add / Update Movie</div>
                    <form className=''>
                        <div className=" mt-4 w-100 row  adminInput">
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <label htmlFor="movieName">Movie Name</label>
                                <input value={movieData.movieName} id='movieName' type="text" placeholder='Movie Name' onChange={(e) => setMovieData({ ...movieData, movieName: e.target.value })} />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="ReleaseDate">Release Date</label>
                                <input type="date" id='ReleaseDate' value={movieData.releaseDate} onChange={(e) => setMovieData({ ...movieData, releaseDate: e.target.value })} />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="movieLength">Movie Length</label>
                                <input value={movieData.movieLength} type="text" id='movieLength' placeholder='Format: 2h 09m' onChange={(e) => setMovieData({ ...movieData, movieLength: e.target.value })} />
                            </div>
                        </div>
                        <div className="mt-4 w-100 row adminInput">
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="language">Movie Language</label>
                                <input id='language' value={movieData.movieLanguage} type="text" placeholder='lowercase' onChange={(e) => setMovieData({ ...movieData, movieLanguage: e.target.value })} />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="rottenTomato">Rotten Tomatoes Rating</label>
                                <input type="number" id='rottenTomato' value={movieData.rottenRating} placeholder='Format-65' onChange={(e) => setMovieData({ ...movieData, rottenRating: e.target.value })} />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="imdbRating">Imdb Rating</label>
                                <input type="number" id='imdbRating' maxLength={'3'} value={movieData.imdbRating} placeholder='Format-8.7' onChange={(e) => setMovieData({ ...movieData, imdbRating: e.target.value })} />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
                                <label htmlFor="genre">Movie Genre</label>
                                <input type="text" value={movieData.movieGenre} id='genre' placeholder='lowercase' onChange={(e) => setMovieData({ ...movieData, movieGenre: e.target.value })} />
                            </div>
                        </div>
                        <div className="mt-4 w-100 row adminInput">
                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                {thumbnailPreview ? <div className='text-center'>
                                    <img height={100} src={thumbnailPreview} />
                                </div> : null}
                                <div>
                                    <label htmlFor="movieImage">Movie Thumbnail</label>
                                    <input id='movieImage' type="file" name='movieThumbnail' placeholder='JPEG/JPG/PNG '
                                        ref={thumbnailInputRef}
                                        onChange={(e) => setMovieData({ ...movieData, movieThumbnail: e.target.files[0] })} />
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                {posterPreview ? <div className='text-center'>
                                    <img height={100} src={posterPreview} />
                                </div> : null}
                                <div>
                                    <label htmlFor="movieThumbnail">Movie Poster JPEG/JPG/PNG
                                        <input type="file" name='moviePoster' id='movieThumbnail' ref={posterInputRef} onChange={(e) => setMovieData({ ...movieData, moviePoster: e.target.files[0] })} /></label>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 mx-auto w-100 row adminInput">
                            <div className='col-lg-4 col-md-4 col-sm-12'>
                                <label htmlFor="movieThumbnail">Movie Trailer</label>
                                <input type="url" id='movieThumbnail' placeholder='Movie Trailer Youtube Link' ref={youtubeRef} onChange={getYoutubeEmbed} />
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12'>
                                <label htmlFor="fromDate">Movie From (DDMMYYYY)</label>
                                <input value={movieData.movieFrom} id='fromDate' type="date" placeholder='Screening From' onChange={(e) => setMovieData({ ...movieData, movieFrom: e.target.value })} />
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-12'>
                                <label htmlFor="toDate">Movie To (DDMMYYYY)</label>
                                <input type="date" id='toDate' value={movieData.movieTo} placeholder='Screening To' onChange={(e) => setMovieData({ ...movieData, movieTo: e.target.value })} />
                            </div>
                        </div>
                        <div className='w-100 adminInput mx-auto mt-4 px-3'>
                            <label htmlFor="">Select Screens</label>
                            <select value={movieData.screensShowing} onChange={(e) => setMovieData({ ...movieData, screensShowing: e.target.value })} className="custom-select w-100 inputSelect mb-4 mx-auto " id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">Screen 1</option>
                                <option value="2">Screen 2</option>
                                <option value="3">Screen 3</option>
                                <option value="4">Screen 4</option>
                                <option value="5">Screen 5</option>
                                <option value="6">Screen 6</option>
                                <option value="7">Screen 7</option>
                                <option value="8">Screen 8</option>
                            </select>
                        </div>
                        <div className="mt-2 w-100 row adminInput">
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <label htmlFor="movieName">About Movie</label>
                                <input id='movieName' type="text" value={movieData.movieAbout} placeholder='Small description on the movie plot' onChange={(e) => setMovieData({ ...movieData, movieAbout: e.target.value })} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='text-center mt-5'>
                    <div onClick={addAllMovieDetails} className='btn movieButtons rounded-pill text-light'>
                        ADD MOVIE
                    </div>
                </div>
            </div>
            {/* <AdminMoviesList /> */}
        </>
    )
}

export default AdminPageOne;
