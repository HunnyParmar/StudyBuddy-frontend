import { useState, useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">⚡ Box Clicker Challenge ⚡</h1>

      {/* Difficulty Selection */}
      {!gameStarted && (
        <div className="mb-4">
          <p className="mb-2">Select Difficulty:</p>
          <select
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            value={selectedDifficulty}
            className="border py-2 px-4 rounded"
          >
            <option value="Slow">Slow</option>
            <option value="Medium">Medium</option>
            <option value="Fast">Fast</option>
          </select>
        </div>
      )}

      {!gameStarted ? (
        <div>
          <p className="mb-4">Click the green box as it moves!</p>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="mb-6 text-lg font-semibold">
          <p>Time Left: {timeLeft}s</p>
          <p>Score: {score}</p>
        </div>
      )}

      {/* Box Area */}
      {gameStarted && timeLeft > 0 && (
        <div
          className="relative bg-gray-200"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Render boxes in a grid */}
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${(index % 3) * (window.innerWidth / 3)}px`,
                top: `${Math.floor(index / 3) * (window.innerHeight / 3)}px`,
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                backgroundColor:
                  index === currentBoxId ? "green" : "gray", // If box is the green one, color it green
                cursor: "pointer",
                borderRadius: "10px",
              }}
              onClick={() => handleBoxClick(index)} // Pass the box index to handle click
            ></div>
          ))}
        </div>
      )}

      {/* Game Over */}
      {timeLeft === 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-lg font-semibold">Your final score: {score}</p>
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
