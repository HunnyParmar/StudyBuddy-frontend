import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

export default function ReactionSpeed() {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [gameStarted, setGameStarted] = useState(false);
  const [boxSize, setBoxSize] = useState(100); // Size of the box
  const [gameInterval, setGameInterval] = useState(null);
  const [difficulty, setDifficulty] = useState(1000); // Time in ms before box moves again
  const [currentBoxColor, setCurrentBoxColor] = useState("green"); // Track the color of the box
  const [currentBoxId, setCurrentBoxId] = useState(null); // Track the box that should be green
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium"); // Default difficulty

  // Random position for the box
  const getRandomPosition = () => {
    const width = window.innerWidth - boxSize;
    const height = window.innerHeight - boxSize;
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return { x, y };
  };

  // Start the game
  const startGame = () => {
    const diff = getDifficulty(selectedDifficulty); // get once
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setBoxSize(100);
    setDifficulty(diff);
  
    if (gameInterval) clearInterval(gameInterval); // Clear previous interval if any
  
    const interval = setInterval(moveBox, diff); // Use the correct one
    setGameInterval(interval);
  };

  // Adjust difficulty based on selection
  const getDifficulty = (level) => {
    switch (level) {
      case "Fast":
        return 1000; // Box moves faster
      case "Slow":
        return 2000; // Box moves slower
      default:
        return 1500; // Default medium speed
    }
  };

  // Move the box to a new random position
  const moveBox = () => {
    const newBoxId = Math.floor(Math.random() * 9); // Randomly select box position (out of 9 boxes)
    setCurrentBoxId(newBoxId); // Update the current box to be green
    setCurrentBoxColor("green"); // Make the selected box green
    setBoxPosition(getRandomPosition());
  };

  // Handle the box click
  const handleBoxClick = (boxId) => {
    if (gameStarted && timeLeft > 0) {
      // Increase score only if the green box is clicked
      if (boxId === currentBoxId) {
        setScore(score + 1); // Increase score for correct box
      }

      setBoxSize(boxSize - 1); // Make the box smaller
      moveBox(); // Move box to new position
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(gameInterval); // Stop the game when time runs out
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
<div
  className="flex flex-col items-center justify-center h-screen p-6 bg-cover bg-center"
  style={{
    backgroundImage: gameStarted
      ? "url('/reactionspeed.jpg')" // image shown when game is running
      : "url('/reactionspeed.jpg')", // image shown before starting
  }}
>  
<Link to="/games">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-2 left-2 z-10" />
      </Link>
    <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">⚡ Box Clicker Challenge ⚡</h1>

      {/* Difficulty Selection */}
      {!gameStarted && (
       <div className="mb-6 text-center text-white">
       <p className="mb-7 text-lg font-semibold bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent drop-shadow">
         Select Difficulty:
       </p>
       <select
         onChange={(e) => setSelectedDifficulty(e.target.value)}
         value={selectedDifficulty}
         className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-white text-blue-900 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
       >
         <option value="Slow">Slow</option>
         <option value="Medium">Medium</option>
         <option value="Fast">Fast</option>
       </select>
     </div>
     
      )}

      {!gameStarted ? (
        <div>
          <button
            onClick={startGame}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-white text-blue-900 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="mb-6 text-lg text-white text-center font-semibold">
          <p>Time Left: {timeLeft}s</p>
          <p>Score: {score}</p>
        </div>
      )}

      {/* Box Area */}
      {gameStarted && timeLeft > 0 && (
        <div
        className="grid grid-cols-3 gap-x-50 gap-y-13 justify-center pr-20"
        style={{
          width: `${boxSize * 3 + 16}px`, // 3 boxes + gaps
          height: `${boxSize * 3 + 16}px`,
        }}
      >
          {/* Render boxes in a grid */}
          {[...Array(9)].map((_, index) => (
    <div
      key={index}
      className="flex items-center justify-center"
      style={{
        width: `${boxSize}px`,
        height: `${boxSize}px`,
        backgroundColor: index === currentBoxId ? "white" : "blue",
        cursor: "pointer",
        borderRadius: "20px",
      }}
      onClick={() => handleBoxClick(index)}
    ></div>
  ))}
</div>
      )}

      {/* Game Over */}
      {timeLeft === 0 && (
        <div className="mt-6 text-center">
          <h2 className="text-white text-3xl font-bold">Game Over!</h2>
          <p className="text-blue-300 text-1xl mt-5 font-semibold">Your final score: {score}</p>
          <button
            onClick={startGame}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
