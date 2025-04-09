import React from "react";
import Quiz from "./Quiz";
import { FaFileWord, FaFilePdf, FaFilePowerpoint } from "react-icons/fa";

const UploadQuiz = () => {
  return (
    <Quiz>
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto text-center border-2 border-dashed border-gray-100">
        <div className="flex justify-center mb-4 gap-6 text-3xl text-gray-500">
          <FaFileWord className="text-blue-500" />
          <FaFilePdf className="text-pink-500" />
          <FaFilePowerpoint className="text-red-400" />
        </div>

        <p className="text-lg font-semibold text-gray-700 mb-2">
          Drag and drop notes, readings, lecture slides, etc.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supported file types are <strong>.docx</strong>, <strong>.pdf</strong>, <strong>.pptx</strong>
        </p>

        <label className="inline-block cursor-pointer bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium">
          Browse files
          <input type="file" className="hidden" />
        </label>
        
      </div>
      <div className="mt-4 flex justify-end mr-5">
          <button className="bg-teal-700 hover:bg-teal-900 text-white px-10 py-2 rounded-md font-medium cursor-pointer">
            Generate
          </button>
        </div>
    </Quiz>
  );
};

export default UploadQuiz;
