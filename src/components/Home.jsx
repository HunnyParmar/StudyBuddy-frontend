import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div id="home" className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/3196061/3196061-uhd_2560_1440_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/*  */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#0B192C]/90 flex flex-col justify-center items-center text-white text-center pt-15 px-6">
          <h2 className="text-5xl bg-gradient-to-r from-teal-400 to-white to-gray-800 text-transparent bg-clip-text font-extrabold py-2">
            Master Your Studies with the <br></br>Ultimate Learning Weapon
          </h2>
          <p className="mt-5 text-lg max-w-2xl px-10">
            Connect, collaborate, and achieve your academic goals with students
            from around the world.
          </p>
          <Link to="/login">
          <button className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
