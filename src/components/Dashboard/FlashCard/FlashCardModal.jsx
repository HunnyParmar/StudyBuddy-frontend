import React from "react";
import { Link } from "react-router-dom";

const FlashCardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center bg-[#0B192C]/80 justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-white text-3xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-center">
          How do you want to create your flashcard?
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <Link
            to="/generatecard"
            className="text-center w-full py-3 bg-blue-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Generate from an upload
          </Link>
          <Link
            to="/setflashcard"
            className="text-center w-full py-3 bg-blue-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Create them yourself
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashCardModal;
