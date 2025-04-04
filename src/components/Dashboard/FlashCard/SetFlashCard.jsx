import React, { useState, useEffect, useRef } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SetFlashCard = () => {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([
    { id: 1, term: "", definition: "", image: "" },
    { id: 2, term: "", definition: "", image: "" },
  ]);
  const [message, setMessage] = useState("");
  const topicRef = useRef(null);
  const notesRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (location.state?.flashcards) {
      const formattedFlashcards = location.state.flashcards.map((card, index) => ({
        id: index + 1,
        term: card.question || "",
        definition: card.answer || "",
        image: card.image || "",
      }));
      setFlashcards(formattedFlashcards);
    }
  }, [location.state]);

  const handleInputChange = (index, field, value) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((card, i) => (i === index ? { ...card, [field]: value } : card))
    );
  };
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please upload a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
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
  
      const generatedFlashcards = response.data.flashcards.map((card, index) => ({
        id: index + 1,
        term: card.question || "",
        definition: card.answer || "",
        image: "",
      }));
  
      setFlashcards(generatedFlashcards); 
      setMessage("AI-generated flashcards added!");
  
    } catch (error) {
      console.error("File Upload Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error generating flashcards.");
    }
  };

  

  const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(index, "image", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: flashcards.length + 1, term: "", definition: "", image: "" }]);
  };

  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    flashcards.forEach((card, index) => {
      formData.append(`flashcards[${index}][question]`, card.term || "");
      formData.append(`flashcards[${index}][answer]`, card.definition || "");
      if (card.image) {
        formData.append(`flashcards[${index}][image]`, card.image);
      }
    });

    try {
      const response = await axios.post("http://localhost:7000/user/flashcards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Flashcards added successfully!");
      topicRef.current.value = "";
      notesRef.current.value = "";
      setFlashcards([
        { id: 1, term: "", definition: "", image: "" },
        { id: 2, term: "", definition: "", image: "" },
      ]);
      setSelectedFile(null);
  
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred while submitting.");
    }
  };

  return (
    <div className="max-w-full px-15 py-6 bg-[#EBE8DB]/25 min-h-screen">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-2 left-2" />
      </Link>
      <h1 className="text-3xl font-bold mt-2 text-[#143D60]">CREATE A NEW FLASHCARD SET</h1>

      <input ref={topicRef} type="text" placeholder="Enter a topic" className="w-full p-2 mt-5 border rounded-lg" />
      <textarea ref={notesRef} placeholder="Add notes..." className="w-full p-2 mt-2 border rounded-lg"></textarea>

      <div className="flex gap-3 mt-4">
        <div className="relative">
          <input type="file" accept="application/pdf" onChange={(e) => setSelectedFile(e.target.files[0])} className="absolute inset-0 cursor-pointer opacity-0" />
          <div className="bg-teal-100/30 px-2 py-1 rounded-md shadow">+Import</div>
        </div>
        <Link to="/generatecard" className="cursor-pointer bg-teal-100/30 px-2 py-1 rounded-md shadow">
          Create from notes 📄
        </Link>
      </div>

      {flashcards.map((card, index) => (
        <div key={index} className="flex items-center justify-between mt-4 p-4 bg-white rounded-lg shadow-md relative">
          <input type="text" placeholder="Enter term" value={card.term} onChange={(e) => handleInputChange(index, "term", e.target.value)} className="w-1/2 border-b-2 outline-none p-2 ml-2" />
          <input type="text" placeholder="Enter definition" value={card.definition} onChange={(e) => handleInputChange(index, "definition", e.target.value)} className="w-1/2 border-b-2 outline-none p-2 ml-4" />

          <div className="relative ml-4">
            <input type="file" id={`file-upload-${index}`} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(index, e.target.files[0])} />
            <div className="text-center bg-gray-200 px-3 py-1 rounded shadow cursor-pointer flex items-center">🖼️ Image</div>
          </div>

          {flashcards.length > 2 && (
            <button onClick={() => removeFlashcard(card.id)} className="cursor-pointer absolute top-1 right-2 text-black text-md">
              &times;
            </button>
          )}
        </div>
      ))}

      <button onClick={addFlashcard} className="cursor-pointer mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow">+ Add Flashcard</button>

      {message && <div className="mt-4 text-green-600">{message}</div>}

      <button onClick={handleSubmit} className="cursor-pointer ml-6 mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow">Submit</button>

      <button onClick={handleFileUpload} className="cursor-pointer ml-6 bg-teal-700 text-white px-4 py-2 rounded-md mt-4">
  Generate from File 📂
</button>

    </div>

    
  );
};

export default SetFlashCard;