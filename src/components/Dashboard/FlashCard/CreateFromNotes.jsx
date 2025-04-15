import React, { useState } from "react";
import axios from "../../../App/axios"; // ✅ Use custom axios instance
import { useNavigate } from "react-router-dom";

const CreateFromNotes = () => {
  const [notesText, setNotesText] = useState("");
  const [message, setMessage] = useState("");
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
      const response = await axios.post(
        "/user/flashcards", // ✅ Use relative path
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
          image: "",
        }));

        console.log("Formatted Flashcards:", formattedFlashcards); 
        navigate("/setflashcard", { state: { flashcards: formattedFlashcards } });
      } else {
        setMessage("AI did not generate enough flashcards.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error generating flashcards.");
    }
  };
  
};

export default CreateFromNotes;
