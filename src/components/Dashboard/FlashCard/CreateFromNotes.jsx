import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      "http://localhost:7000/user/flashcards",
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

export default CreateFromNotes;