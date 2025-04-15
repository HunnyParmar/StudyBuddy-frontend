import React, { useState } from "react";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
import FlashCardModal from "./FlashCardModal";

const FlashCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Dashboard />

      {/* Main Content Section */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-auto p-6 pt-5 md:pt-10">

        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/736x/ae/f7/a8/aef7a81219246e5154314e3e4cf6114a.jpg"
            alt="Background"
            className="w-full h-full object-cover blur-[3px]"
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
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
              className="cursor-pointer py-6 px-15 bg-blue-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            >
              Set FlashCard
            </button>

            <Link
              to="/my-flashcards"
              className="py-6 px-15 bg-pink-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            >
              My FlashCard
            </Link>

            <Link
              to="/all-flashcards"
              className="py-6 px-15 bg-teal-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            >
              All FlashCard
            </Link>
          </div>
        </div>
      </div>

      <FlashCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FlashCard;
