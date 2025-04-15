import React, { useState, useEffect, useRef } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import axios from "../../../App/axios"; // ✅ Custom Axios instance

const SetFlashCard = () => {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([
    { id: 1, term: "", definition: "", image: "" },
    { id: 2, term: "", definition: "", image: "" },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
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

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("topic", topicRef.current.value);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login.");
        return;
      }

      const response = await axios.post("/user/flashcards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

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
    } finally {
      setLoading(false);
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

    setLoading(true);

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
      await axios.post("/user/flashcards", formData, {
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
      setFileAdded(false);

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileAdded(true);
  };


  return (
    <div className="relative min-h-screen overflow-auto">
      {/* Blurred background image */}
<div
  className="absolute inset-0 bg-cover bg-center blur-sm z-[-1]"
  style={{
    backgroundImage: "url('https://i.etsystatic.com/7267538/r/il/eff5bd/2220380309/il_570xN.2220380309_mjdx.jpg')",
  }}
></div>

{/* Overlay */}
<div className="absolute inset-0 bg-teal-900/60 z-[-1]"></div>


      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-center z-50">
          <div className="w-16 h-16 ml-20 border-4 border-t-4 border-teal-700 rounded-full animate-spin"></div>
          <span className="text-teal-900 ml-4 text-lg">Generating...</span>
        </div>
      )}

      {/* Go Back Button */}
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-2 left-2 z-[999]" />
      </Link>

      {/* Main content */}
      <div className="relative z-10 px-6 py-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-bold mt-2 text-[#143D60]">
            CREATE A NEW FLASHCARD SET
          </h1>

          <input
            ref={topicRef}
            type="text"
            placeholder="Enter a topic"
            className="w-full p-2 mt-5 border rounded-lg"
          />
          <textarea
            ref={notesRef}
            placeholder="Add notes..."
            className="w-full p-2 mt-2 border rounded-lg"
          ></textarea>

          <div className="flex gap-3 mt-4">
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="bg-teal-100/30 px-2 py-1 rounded-md shadow">
                {fileAdded ? "File Added" : "+Import"}
              </div>
            </div>
            <Link
              to="/generatecard"
              className="cursor-pointer bg-teal-100/30 px-2 py-1 rounded-md shadow"
            >
              Create from notes 📄
            </Link>
          </div>

          {flashcards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between mt-4 p-4 bg-white rounded-lg shadow-md relative"
            >
              <input
                type="text"
                placeholder="Enter term"
                value={card.term}
                onChange={(e) =>
                  handleInputChange(index, "term", e.target.value)
                }
                className="w-1/2 border-b-2 outline-none p-2 ml-2"
              />
              <input
                type="text"
                placeholder="Enter definition"
                value={card.definition}
                onChange={(e) =>
                  handleInputChange(index, "definition", e.target.value)
                }
                className="w-1/2 border-b-2 outline-none p-2 ml-4"
              />

              <div className="relative ml-4">
                <input
                  type="file"
                  id={`file-upload-${index}`}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                />
                <div className="text-center bg-gray-200 px-3 py-1 rounded shadow cursor-pointer flex items-center">
                  🖼️ Image
                </div>
              </div>

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

          <button
            onClick={addFlashcard}
            className="cursor-pointer mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow"
          >
            + Add Flashcard
          </button>

          <button
            onClick={handleSubmit}
            className="cursor-pointer ml-6 mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow"
          >
            Submit
          </button>

          <button
            onClick={handleFileUpload}
            className="cursor-pointer ml-6 bg-teal-700 text-white px-4 py-2 rounded-md mt-4"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                <span className="ml-2">Generating...</span>
              </div>
            ) : (
              "Generate from File 📂"
            )}
          </button>

          {message && <div className="mt-4 text-green-600">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default SetFlashCard;
