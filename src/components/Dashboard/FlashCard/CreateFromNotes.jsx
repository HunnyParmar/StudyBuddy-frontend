import React, { useState } from "react";
import axios from "../../../App/axios"; // ✅ Use your custom axios instance
import { useNavigate } from "react-router-dom";

const CreateFromNotes = () => {
  const [notesText, setNotesText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // optional: show loading spinner
  const navigate = useNavigate();

  const handleGenerateQuestions = async () => {
    if (!notesText.trim()) {
      setMessage("Please enter some text to generate flashcards.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please login.");
      return;
    }

    try {
      setLoading(true); // start loading

      const response = await axios.post(
        "/user/flashcards", // ✅ Correct endpoint
        { text: notesText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.flashcards?.length > 0) {
        setMessage("Flashcards generated successfully!");

        const formattedFlashcards = response.data.flashcards.map((card, index) => ({
          id: index + 1,
          term: card.question || "",
          definition: card.answer || "",
          image: card.image || "", // ✅ Handle image if present
        }));

        console.log("Formatted Flashcards:", formattedFlashcards);

        navigate("/setflashcard", { state: { flashcards: formattedFlashcards } });
      } else {
        setMessage("AI did not generate enough flashcards.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.error || "Error generating flashcards.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div>
      <h2>Create Flashcards from Notes</h2>
      <textarea
        value={notesText}
        onChange={(e) => setNotesText(e.target.value)}
        placeholder="Enter your notes here"
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleGenerateQuestions} disabled={loading}>
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateFromNotes;
