import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../App/axios";

const GenerateFlashCard = () => {
  const [text, setText] = useState(""); // To store text input for generating flashcards
  const [file, setFile] = useState(null); // To store uploaded file for generating flashcards
  const [message, setMessage] = useState(""); // For displaying messages
  const [loading, setLoading] = useState(false); // For managing loading state
  const navigate = useNavigate(); // For navigation after successful flashcard generation

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture selected file
  };

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value); // Set text value from textarea
  };

  // Handle the generation of flashcards
  const handleGenerate = async () => {
    if (!text && !file) {
      setMessage("Please provide text or upload a file to generate flashcards.");
      return;
    }

    const formData = new FormData();
    if (text) formData.append("text", text); // Append text if provided
    if (file) formData.append("file", file); // Append file if uploaded
    formData.append("topic", "General"); // Default topic

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please login.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/user/flashcards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.flashcards?.length > 0) {
        setMessage("Flashcards generated successfully!");
        navigate("/setflashcard", { state: { flashcards: response.data.flashcards } });
      } else {
        setMessage("AI did not generate enough flashcards.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error generating flashcards.");
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img
          src="https://i.etsystatic.com/7267538/r/il/eff5bd/2220380309/il_570xN.2220380309_mjdx.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-teal-900/60"></div>
      </div>

      {/* Back Button */}
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-3 left-3 z-50" />
      </Link>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[90vh] overflow-y-auto z-10">
        <h1 className="text-[#143D60] text-3xl font-bold">GENERATE FLASHCARD SET</h1>

        {/* Navigation buttons */}
        <div className="flex gap-6 mt-4">
          <button className="pb-1 border-b-3 border-white hover:border-teal-700">Paste text</button>
          <Link to="/setflashcard" className="pb-1 border-b-3 border-white hover:border-teal-700">Upload files</Link>
        </div>

        {/* Textarea for text input */}
        <textarea
          className="w-full mt-4 p-3 border rounded-md h-32 bg-gray-50"
          placeholder="Put your notes here. We'll do the rest."
          value={text}
          onChange={handleTextChange}
        />
        <p className="text-right text-gray-500 text-sm mt-1">0/100,000 characters</p>

        {/* File upload */}
        <div className="mt-4">
          <input
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer bg-teal-100/30 px-2 py-1 rounded-md shadow">
            {file ? file.name : "+Upload File"}
          </label>
          {file && <p className="text-teal-700 mt-2">{file.name}</p>}
        </div>

        {/* Instructions Section */}
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

        {/* Display messages if any */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* Generate Button */}
        <button
          className="w-40 text-lg mt-4 py-2 bg-teal-700 text-white font-semibold rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default GenerateFlashCard;
