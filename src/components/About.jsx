import React from 'react'
import { motion } from "framer-motion";
const About = () => {
  return (
    <>
      <section className="relative w-full mx-auto px-6 py-16 bg-teal-50" id="about">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-md"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/turquoise-wavy-background_23-2147493962.jpg?t=st=1741029118~exp=1741032718~hmac=4ee927dacab02aaa407a02e39d8901416270c8532e8d806268d467d74191b344&w=900')`,
          }}
        ></div>
        <div className="relative ">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Why Choose StudyBuddy?
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Smart Matching System"
              description="Find the perfect study buddy based on subjects and learning styles."
            />
            <FeatureCard
              title="AI-Powered Flashcards"
              description="Create, share, and test your knowledge with interactive flashcards."
            />
            <FeatureCard
              title="Live Study Groups"
              description="Chat, collaborate, and study in real-time with like-minded learners."
            />
            <FeatureCard
              title="Goal & Progress Tracking"
              description="Stay motivated with daily targets and achievements."
            />
            <FeatureCard
              title="Leaderboard & Rewards"
              description="Gamify your learning experience with points, badges, and rankings!"
            />
            <FeatureCard
              title="Dark Mode"
              description="Enjoy a seamless experience on any device with dark mode support."
            />
          </div>
        </div>
      </section>
    </>
  )
}
const FeatureCard = ({ title, description }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white opacity-90 shadow-xl rounded-2xl p-10 text-center transition-all duration-300 hover:bg-teal-500 hover:shadow-2xl group"
      >
        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        <p className="text-gray-600 mt-3 transition-colors duration-300">
          {description}
        </p>
      </motion.div>
    );
  };

export default About
