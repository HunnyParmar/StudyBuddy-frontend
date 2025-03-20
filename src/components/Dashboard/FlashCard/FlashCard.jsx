import React, { useState } from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import FlashCardModal from "./FlashCardModal"; // Import modal

const FlashCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Dashboard />

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 overflow-auto p-6 pt-5 md:pt-10">
        <h1 className="text-4xl font-bold text-gray-800">FlashCard</h1>
        <p className="text-gray-600 mt-2">
          Find flashcard sets, classes, users, and more.
        </p>

        <div className="w-130 flex justify-center mt-6">
          <input
            type="text"
            placeholder="Search by subject or keyword"
            className="w-full max-w-7xl p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <h2 className="mt-8 text-lg font-semibold text-gray-700">
          Create your own FlashCards
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer py-6 px-15 bg-blue-100 rounded-lg shadow-md"
          >
            Set FlashCard
          </button>
          <Link className="py-6 px-15 bg-pink-100 rounded-lg shadow-md">Create Folder</Link>
          <Link className="py-6 px-15 bg-orange-100 rounded-lg shadow-md">
            Create Classes
          </Link>
        </div>
      </div>

      {/* Render modal */}
      <FlashCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FlashCard;
