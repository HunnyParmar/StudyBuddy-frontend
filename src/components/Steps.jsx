import React from 'react';
import { motion } from 'framer-motion';

const Steps = () => {
  return (
    <div className="py-10 pb-15 px-4" id="works">
      <h2 className="text-3xl font-bold text-center text-gray-800 pb-10">
        How it Works?
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <Card
          no="Step-1"
          title="Create Your Profile"
          buttonText="Select your subjects & interests."
          imgSrc="https://img.freepik.com/free-photo/application-occupation-profession-job-seeker-concept_53876-122755.jpg?t=st=1741069585~exp=1741073185~hmac=94dd2a612c523f6fdb8a3cc6e699df7b3233aca3d872b65f55415ac7901b9372&w=1380"
          rotation="lg:rotate-2"
        />
        <Card
          no="Step-2"
          title="Find a Study Buddy"
          buttonText="Match with students sharing the same goals."
          imgSrc="https://img.freepik.com/free-photo/woman-selecting-pictures-people_1134-466.jpg?t=st=1741069841~exp=1741073441~hmac=da118610745037194925292ea4ea2b858382fcf3c480794c21a65975a40e18cb&w=1380"
          rotation="lg:-rotate-2"
        />
        <Card
          no="Step-3"
          title="Join Study Groups & Flashcards"
          buttonText="Collaborate, discuss, and test knowledge."
          imgSrc="https://media.istockphoto.com/id/1411110345/photo/side-view-of-a-successful-smart-guy-listening-to-an-online-lecture-taking-notes-in-a-notebook.jpg?s=2048x2048&w=is&k=20&c=TxDfvRr-lDc-XrWKDQTyhYOHkybwjqLsUMmbb-a4cAg="
          rotation="lg:rotate-3"
        />
        <Card
          no="Step-4"
          title="Track Your Learning"
          buttonText="Stay on top with progress reports & leaderboards."
          imgSrc="https://img.freepik.com/free-vector/businessman-writing-graph-with-sky-background_1308-37856.jpg?t=st=1741070384~exp=1741073984~hmac=9d4b523101f174350c5a148a692d7a64e389584c6b79840f1581cec228cf4917&w=900"
          rotation="lg:-rotate-3"
        />
      </div>
    </div>
  );
};

const Card = ({ no, title, buttonText, imgSrc, rotation }) => {
  return (
    <motion.div
      className={`relative w-[200px] h-[250px] rounded-md overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 ${rotation}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col p-4 justify-center bg-[#0B192C]/80">
        <span className="text-sm text-white uppercase">{no}</span>
        <h2 className="text-lg text-white font-bold pt-2">{title}</h2>
        <p className="mt-3 py-2 bg-gray-700 rounded-lg text-white text-sm font-semibold">
          {buttonText}
        </p>
      </div>
    </motion.div>
  );
};

export default Steps;
