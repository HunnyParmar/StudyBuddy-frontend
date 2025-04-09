import React from "react";
import Quiz from "./Quiz";

const PasteTextQuiz = () => {
  return (
    <Quiz>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto flex flex-col justify-between min-h-[60px] border border-gray-200">
        
        <textarea
          placeholder="Paste text here or drop a file"
          className="w-full h-40 border border-gray-300 rounded-md p-4 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        
      </div>
      <div className="mt-4 flex justify-end mr-5">
          <button className="bg-teal-700 hover:bg-teal-900 text-white px-10 py-2 rounded-md font-medium cursor-pointer">
            Generate
          </button>
        </div>
    </Quiz>
  );
};

export default PasteTextQuiz;
