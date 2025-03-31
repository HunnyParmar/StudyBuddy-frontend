import React, { useState, useRef } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const SetFlashCard = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, term: "", definition: "", image: "" },
    { id: 2, term: "", definition: "", image: "" },
  ]);
  const [message, setMessage] = useState(""); // To store the success message
  const topicRef = useRef(null);
  const notesRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFlashcards, setUploadedFlashcards] = useState([]); // State to store generated flashcards

  // Handle input changes for flashcards (term/definition)
  const handleInputChange = (index, field, value) => {
    const updatedFlashcards = flashcards.map((card, i) =>
      i === index ? { ...card, [field]: value } : card
    );
    console.log("Updated Flashcards:", updatedFlashcards); // Log updated state
    setFlashcards(updatedFlashcards);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("topic", topicRef.current.value);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login.");
        return;
      }

      const response = await axios.post(
        "http://localhost:7000/user/flashcards",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFlashcards(response.data.flashcards);
      setMessage("AI-generated flashcards added!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error generating flashcards.");
    }
  };

  // Handle file input changes (image for flashcards)
  const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(index, "image", reader.result); // Save image as base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Add a new flashcard
  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { id: flashcards.length + 1, term: "", definition: "", image: "" },
    ]);
  };

  // Remove an existing flashcard
  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if topic and notes are provided
    if (!topicRef.current.value) {
        setMessage("Topic is required.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        setMessage("No token found. Please login.");
        return;
    }

    const formData = new FormData();
    formData.append("topic", topicRef.current.value);
    if (notesRef.current.value) {
        formData.append("notes", notesRef.current.value);
    }

    // Check if a file is uploaded
    if (selectedFile) {
        formData.append("file", selectedFile);
    } else {
        // Manually entered flashcards
        if (flashcards.length < 2) {
            setMessage("Please enter at least 2 flashcards.");
            return;
        }

        flashcards.forEach((card, index) => {
            formData.append(`flashcards[${index}][question]`, card.term || "");
            formData.append(`flashcards[${index}][answer]`, card.definition || "");
            if (card.image) {
                formData.append(`flashcards[${index}][image]`, card.image);
            }
        });
    }

    try {
        const response = await axios.post("http://localhost:7000/user/flashcards", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        const flashcardsData = response.data.flashcards;
        if (flashcardsData && flashcardsData.length > 0) {
            setUploadedFlashcards(flashcardsData);
            setMessage("Flashcards added successfully!");
        } else {
            setMessage("No flashcards returned from the server.");
        }
    } catch (error) {
        console.error("Error Response:", error.response);
        setMessage(error.response?.data?.message || "An error occurred while submitting.");
    }
};

  
  
  

  return (
    <div className="max-w-full px-15 py-6 bg-[#EBE8DB]/25 min-h-screen">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-2 left-2" />
      </Link>
      <h1 className="text-3xl font-bold mt-2 text-[#143D60]">CREATE A NEW FLASHCARD SET</h1>

      {/* Topic Input */}
      <input
        ref={topicRef}
        type="text"
        placeholder='Enter a topic, like "React JS : Redux"'
        className="w-full p-2 mt-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {/* Notes Input */}
      <textarea
        ref={notesRef}
        placeholder="Add notes..."
        className="w-full p-1 pl-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      ></textarea>

      <div className="flex gap-3 mt-4">
        {/* File import */}
        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="bg-teal-100/30 px-2 py-1 rounded-md shadow">+Import</div>
        </div>

        {/* Link to create flashcards from notes */}
        <Link to="/generatecard" className="cursor-pointer bg-teal-100/30 px-2 py-1 rounded-md shadow">
          Create from notes 📄
        </Link>
      </div>

      {/* Render flashcards */}
      {flashcards.map((card, index) => (
        <div key={card.id} className="flex mt-4 p-4 bg-white rounded-lg shadow-md relative">
          {/* Term input */}
          <input
            type="text"
            placeholder="Enter term"
            value={card.term}
            onChange={(e) => handleInputChange(index, "term", e.target.value)}
            className="w-1/2 border-b-2 outline-none p-2 ml-2"
          />

          {/* Definition input */}
          <input
            type="text"
            placeholder="Enter definition"
            value={card.definition}
            onChange={(e) => handleInputChange(index, "definition", e.target.value)}
            className="w-1/2 border-b-2 outline-none p-2 ml-4"
          />

          {/* Image upload */}
          <div className="relative ml-4">
            <input
              type="file"
              id={`file-upload-${index}`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
            />
            <div className="text-center bg-gray-200 px-3 py-1 rounded shadow cursor-pointer flex items-center">
              🖼️ Image
            </div>
          </div>

          {/* Remove flashcard button */}
          {flashcards.length > 2 && (
            <button
              onClick={() => removeFlashcard(card.id)}
              className="cursor-pointer absolute top-1 right-2 text-black text-md"
            >
              &times;
            </button>
          )}
        </div>
      ))}

      {/* Add flashcard button */}
      <button
        onClick={addFlashcard}
        className="cursor-pointer mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
      >
        + Add Flashcard
      </button>

      {/* Success message */}
      {message && <div className="mt-4 text-green-600">{message}</div>}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="cursor-pointer ml-6 mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
      >
        Submit
      </button>

      {/* Render generated flashcards after submission */}
      <div>
        <h2>Generated Flashcards:</h2>
        {uploadedFlashcards.length > 0 ? (
          uploadedFlashcards.map((card) => (
            <div key={card._id} className="flashcard">
              <div>
                <strong>Question: </strong>{card.question}
              </div>
              <div>
                <strong>Answer: </strong>{card.answer}
              </div>
            </div>
          ))
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>
    </div>
  );
};

export default SetFlashCard;