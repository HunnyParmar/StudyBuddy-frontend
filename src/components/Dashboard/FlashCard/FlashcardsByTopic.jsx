import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "../../../App/axios";
import { motion } from 'framer-motion';
import { IoChevronBackSharp, IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";

const FlashcardsByTopic = () => {
  const { topic } = useParams(); // This is the topic _id
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`/user/flashcards/${topic}`, { headers });
        setFlashcards(res.data.flashcards || []);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [topic]);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 via-white to-teal-100 p-4">
      <Link to="/flashcard">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-2 text-4xl border rounded-full fixed top-4 left-4" />
      </Link>

      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-6">
          Flashcards
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading flashcards...</p>
        ) : flashcards.length === 0 ? (
          <p className="text-gray-500 text-center">No flashcards found for this topic.</p>
        ) : (
          <div className="relative w-full h-[500px] flex justify-center items-center">
            {/* Left Arrow */}
            <button
              onClick={prevCard}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
            >
              <IoChevronBackCircle className="text-5xl text-teal-600 hover:text-teal-800" />
            </button>

            {/* Flashcard Carousel */}
            <div className="w-[600px] h-[400px] relative">
              <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full absolute rounded-2xl shadow-lg bg-white flex flex-col justify-between items-center p-6 transform-style-preserve-3d"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                      {flashcards[currentIndex].question}
                    </h3>
                    <p className="text-base text-gray-700 text-center">
                      {flashcards[currentIndex].answer}
                    </p>

                    {flashcards[currentIndex].image && (
                      <button
                        onClick={() => setIsFlipped(true)}
                        className="mt-6 text-teal-600 underline hover:text-teal-800"
                      >
                        Click to show image
                      </button>
                    )}
                  </div>

                  {/* Back Side (Image) */}
                  <div
                    className="absolute w-full h-full flex flex-col items-center justify-center rotateY-180 backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {flashcards[currentIndex].image ? (
                      <img
                        src={flashcards[currentIndex].image}
                        alt="flashcard visual"
                        className="max-h-[280px] object-contain rounded-xl mb-4"
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="mt-4 text-teal-600 underline hover:text-teal-800"
                    >
                      Click to view Q&A
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

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
