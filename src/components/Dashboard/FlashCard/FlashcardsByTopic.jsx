import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../../App/axios"; // ✅ Use custom axios instance
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";

const FlashcardsByTopic = () => {
  const { topic } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(
          `/user/flashcards?topic=${encodeURIComponent(topic)}`, 
          { headers }
        );

        setFlashcards(res.data.flashcards || []);
      } catch (err) {
        console.error('Failed to fetch flashcards:', err);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [topic]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-fixed bg-gradient-to-br from-teal-50 via-white to-teal-100 p-4">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-2 text-4xl border-1 rounded-full fixed top-4 left-4" />
      </Link>
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-teal-600 text-center">
          Flashcards for "{topic}"
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading flashcards...</p>
        ) : flashcards.length === 0 ? (
          <p className="text-gray-500 text-center">No flashcards found for this topic.</p>
        ) : (
          <div className="relative w-full h-[480px] flex justify-center items-center">
            {/* Left Arrow */}
            <button
              onClick={prevCard}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
            >
              <IoChevronBackCircle className="text-5xl text-teal-600 hover:text-teal-800" />
            </button>

            {/* Card Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={flashcards[currentIndex]._id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-[600px] h-[380px] border rounded-2xl p-6 shadow-md bg-white flex flex-col justify-center items-center text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{flashcards[currentIndex].question}</h3>
                <p className="text-gray-700">{flashcards[currentIndex].answer}</p>
                {flashcards[currentIndex].image && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={flashcards[currentIndex].image}
                      alt="flashcard visual"
                      className="w-[200px] h-[200px] object-cover rounded"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow */}
            <button
              onClick={nextCard}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10"
            >
              <IoChevronForwardCircle className="text-5xl text-teal-600 hover:text-teal-800" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsByTopic;
