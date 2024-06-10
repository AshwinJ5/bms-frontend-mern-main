import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { editMoviesAPI } from '../Services/allApi';

function AdminEditMovies({ movie, setMovieData, movieData }) {
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [posterPreview, setPosterPreview] = useState("");

    useEffect(() => {
        if (movieData.movieThumbnail) {
            setThumbnailPreview(URL.createObjectURL(movieData.movieThumbnail));
        } else {
            setThumbnailPreview("");
        }
    }, [movieData.movieThumbnail]);

    useEffect(() => {
        if (movieData.moviePoster) {
            setPosterPreview(URL.createObjectURL(movieData.moviePoster));
        } else {
            setPosterPreview("");
        }
    }, [movieData.moviePoster]);



    const handleUpdate = async () => {
        const { movieName, releaseDate, movieLength, movieLanguage, rottenRating, imdbRating, movieGenre, movieThumbnail, moviePoster, movieTrailer, movieFrom, movieTo, screensShowing, movieAbout } = movieData;

        if (!movieName || !releaseDate || !movieLength || !movieLanguage || !rottenRating || !imdbRating || !movieGenre || !movieThumbnail || !moviePoster || !movieTrailer || !movieFrom || !movieTo || !screensShowing || !movieAbout) {
            Swal.fire({
                title: "Missing Fields!",
                text: "Please fill all fields",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        const reqBody = new FormData();
        reqBody.append("movieName", movieName);
        reqBody.append("releaseDate", releaseDate);
        reqBody.append("movieLength", movieLength);
        reqBody.append("movieLanguage", movieLanguage);
        reqBody.append("rottenRating", rottenRating);
        reqBody.append("imdbRating", imdbRating);
        reqBody.append("movieGenre", movieGenre);
        reqBody.append("movieThumbnail", thumbnailPreview ? movieThumbnail : movie.movieThumbnail);
        reqBody.append("moviePoster", posterPreview ? moviePoster : movie.moviePoster);
        reqBody.append("movieTrailer",movieTrailer);
        reqBody.append("movieFrom", movieFrom);
        reqBody.append("movieTo", movieTo);
        reqBody.append("screensShowing", screensShowing);
        reqBody.append("movieAbout", movieAbout);

        const token = sessionStorage.getItem("token");
        const email = sessionStorage.getItem("email");
        if (token && email) {
            const reqHeader = {
                "Content-Type": posterPreview || thumbnailPreview ? "multipart/form-data" : "application/json",
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await editMoviesAPI(movie._id, reqBody, reqHeader);
                if (result.status === 200) {
                    setMovieData({
                        movieName, 
                        releaseDate, 
                        movieLength, 
                        movieLanguage, 
                        rottenRating, 
                        imdbRating, 
                        movieGenre, 
                        movieThumbnail: "", 
                        moviePoster: "", 
                        movieTrailer, 
                        movieFrom, 
                        movieTo, 
                        screensShowing, 
                        movieAbout
                    });
                    Swal.fire({
                        title: "Success!",
                        text: "Movie updated successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while updating the movie",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    };

    return (
        <>
            <button onClick={handleUpdate} className='btn btn-success btn-sm m-1'>
                <i className="fa-solid fa-pen"></i>
            </button>
        </>
    );
}

export default AdminEditMovies;
