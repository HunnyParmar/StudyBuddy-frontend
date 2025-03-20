import React, { useState } from "react";

const SetFlashCard = () => {
    const [flashcards, setFlashcards] = useState([{ id: 1, term: "", definition: "" }]);

    // Add new flashcard
    const addFlashcard = () => {
      setFlashcards([...flashcards, { id: flashcards.length + 1, term: "", definition: "" }]);
    };
  
    // Remove flashcard
    const removeFlashcard = (id) => {
      setFlashcards(flashcards.filter((card) => card.id !== id));
    };
  
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold">Create a new flashcard set</h1>
  
        {/* Title & Description */}
        <input
          type="text"
          placeholder='Enter a title, like "Biology - Chapter 22: Evolution"'
          className="w-full p-2 mt-4 border rounded-lg shadow-sm"
        />
        <textarea
          placeholder="Add a description..."
          className="w-full p-2 mt-2 border rounded-lg shadow-sm"
        ></textarea>
  
        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded-md shadow">+ Import</button>
          <button className="bg-yellow-100 px-4 py-2 rounded-md shadow">+ Add diagram 🖼️</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md shadow">📄 Create from notes</button>
        </div>
  
        {/* Flashcards List */}
        {flashcards.map((card) => (
          <div key={card.id} className="flex mt-4 p-4 bg-white rounded-lg shadow-md relative">
            <span className="absolute top-2 left-2 text-gray-400">{card.id}</span>
            <input
              type="text"
              placeholder="Enter term"
              className="w-1/2 border-b-2 outline-none p-2"
            />
            <input
              type="text"
              placeholder="Enter definition"
              className="w-1/2 border-b-2 outline-none p-2 ml-4"
            />
            <button className="ml-4 mr-3 bg-gray-200 px-3 py-1 rounded shadow">🖼️ Image</button>
            {flashcards.length > 1 && (
              <button onClick={() => removeFlashcard(card.id)} className="absolute top-1 right-2 text-black text-sm">
                ❎
              </button>
            )}
          </div>
        ))}
  
        {/* Add Flashcard Button */}
        <button onClick={addFlashcard} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow">
          + Add Flashcard
        </button>
      </div>
    );
  };
  

export default SetFlashCard
