import React from 'react'
import { Link } from 'react-router-dom';
import Dashboard from "../Dashboard";
const Quiz = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 flex flex-col mt-15 bg-teal-100/20 overflow-auto p-6 pt-5 md:pt-10 ">
        <h1 className="text-4xl font-bold text-gray-800">Generate a Practice Test</h1>
        <p className="text-gray-600 mt-2">
          Choose or upload materials to generate practice questions designed for you
        </p>
        <div className="flex gap-6 mt-8 mb-6">
          <Link to="/uploadquiz" className="pb-1 border-b-3 font-semibold text-teal-700 border-white hover:border-teal-700">Upload files</Link>
          <Link to="/pastetextquiz" className="pb-1 border-b-3 font-semibold text-teal-700 border-white hover:border-teal-700">Paste texts</Link>
          <Link to="/quizhistory" className="pb-1 border-b-3 font-semibold text-teal-700 border-white hover:border-teal-700">View Past Quizzes</Link>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};


export default Quiz
