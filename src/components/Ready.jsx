import React from 'react'
import { Link } from 'react-router-dom';
const Ready = () => {
  return (
    <>
      <section className="text-center py-16 bg-gradient-to-bl from-teal-300 to-gray-700 to-[#2CA4BF] text-white" id="login">
        <h2 className="text-3xl font-bold">Ready to Study Smarter?</h2>
        <p className="mt-4 text-lg">
          Join thousands of students making learning fun and productive.
        </p>
        <Link to="/signup">
        <button className="mt-6 bg-white text-[#053F5E] px-6 py-3 rounded-lg font-semibold hover:font-bold">
          Sign Up for Free
        </button>
        </Link>
      </section>
    </>
  )
}

export default Ready
