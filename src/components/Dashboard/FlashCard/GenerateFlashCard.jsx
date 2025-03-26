import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const GenerateFlashCard = () => {
    const [text, setText] = useState("");
  return (
    <div className="min-h-screen bg-[#EBE8DB]/25 flex justify-center items-center">
        <Link to="/flashcard">
          <IoChevronBackSharp className='text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-3 left-3'/>
        </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-[#143D60] text-3xl font-bold">GENERATE FLASHCARD SET</h1>

        {/* Tabs */}
        <div className="flex gap-6 mt-4">
          <button className="pb-1 border-b-3 border-white hover:border-teal-700">Paste text</button>
          <button className="pb-1 border-b-3 border-white hover:border-teal-700">Upload files</button>
        </div>

        {/* Text input area */}
        <textarea
          className="w-full mt-4 p-3 border rounded-md h-32 bg-gray-50"
          placeholder="Put your notes here. We'll do the rest."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="text-right text-gray-500 text-sm mt-1">0/100,000 characters</p>

        {/* Study guide info */}
        <div className="mt-6 p-4 border rounded-md flex items-center gap-3 bg-teal-50">
          <span className="text-teal-700 text-lg">📖</span>
          <p>
            <span className="font-semibold">Study guide</span> Synthesize and organize
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-500 text-xs mt-4">
          This product is enhanced by AI and may provide incorrect or problematic content.
          Do not enter personal data.
        </p>

        {/* Generate button */}
        <button
          className="w-full text-lg mt-4 py-2 bg-teal-700 text-white font-semibold rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
        >
          Generate
        </button>
      </div>
    </div>
  );
};


export default GenerateFlashCard
