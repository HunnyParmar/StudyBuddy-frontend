import React from 'react';
import { Link } from 'react-router-dom';

const Ready = () => {
  return (
    <section
      className="text-center py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-bl from-teal-300 to-gray-700 to-[#2CA4BF] text-white"
      id="login"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Ready to Study Smarter?
      </h2>

      <p className="mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl mx-auto">
        Join thousands of students making learning fun and productive.
      </p>

      <Link to="/signup">
        <button className="mt-6 px-6 py-3 text-sm sm:text-base bg-white text-[#053F5E] rounded-lg font-semibold hover:font-bold transition duration-300">
          Sign Up for Free
        </button>
      </Link>
    </section>
  );
};

export default Ready;
