import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/3196061/3196061-uhd_2560_1440_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-full bg-[#0B192C]/90 flex flex-col justify-center items-center text-white text-center px-4 sm:px-6 md:px-10">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-teal-400 to-white text-transparent bg-clip-text font-extrabold py-2"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Master Your Studies with the <br /> Ultimate Learning Weapon
        </motion.h2>

        <motion.p
          className="mt-4 sm:mt-5 text-base sm:text-lg max-w-2xl px-4 sm:px-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Connect, collaborate, and achieve your academic goals with students
          from around the world.
        </motion.p>

        <Link to="/login">
          <button className="mt-6 px-6 py-3 text-sm sm:text-base bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
