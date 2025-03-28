import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const SetFlashCard = () => {
    const [flashcards, setFlashcards] = useState([
        { id: 1, term: "", definition: "" },
        { id: 2, term: "", definition: "" }
      ]);

  // Add new flashcard
  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { id: flashcards.length + 1, term: "", definition: "" },
    ]);
  };

  // Remove flashcard
  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  return (
    <div className="max-w-full px-15 py-6 bg-[#EBE8DB]/25 min-h-screen">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-3xl border-1 rounded-full fixed top-2 left-2" />
      </Link>
      <h1 className="text-3xl font-bold mt-2 text-[#143D60]">
        CREATE A NEW FLASHCARD SET
      </h1>

      <input
        type="text"
        placeholder='Enter a title, like "React JS : Redux"'
        className="w-full p-2 mt-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <textarea
        placeholder="Add a description..."
        className="w-full p-1 pl-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      ></textarea>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <div className="relative">
        <input type="file" className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="bg-teal-100/30 px-2 py-1 rounded-md shadow">+Import</div>
        </div>
        <Link to="/generatecard" className="cursor-pointer bg-teal-100/30 px-2 py-1 rounded-md shadow">
          Create from notes 📄
        </Link>
      </div>

      {/* Flashcards List */}
      {flashcards.map((card) => (
        <div
          key={card.id}
          className="flex mt-4 p-4 bg-white rounded-lg shadow-md relative"
        >
          <span className="absolute top-2 left-2 text-gray-500 ml-1">
            {card.id}
          </span>
          <input
            type="text"
            placeholder="Enter term"
            className="w-1/2 border-b-2 outline-none p-2 ml-2"
          />
          <input
            type="text"
            placeholder="Enter definition"
            className="w-1/2 border-b-2 outline-none p-2 ml-4"
          />
          <div className="relative ml-4">
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => console.log(e.target.files[0])}
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

      {/* Add Flashcard Button */}
      <button
        onClick={addFlashcard}
        className="cursor-pointer mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
      >
        + Add Flashcard
      </button>
      <button
        onSubmit={addFlashcard}
        className="cursor-pointer ml-6 mt-6 px-6 py-2 bg-teal-700 text-white rounded-lg shadow hover:border-teal-700 hover:text-teal-800 hover:bg-white border-2"
      >
        Submit
      </button>
    </div>
  );
};

export default SetFlashCard;
