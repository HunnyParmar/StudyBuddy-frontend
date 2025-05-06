import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

export default function TypingSpeedTest() {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(""); // New for difficulty

  const inputRef = useRef(null);

  // Fetch words based on difficulty
  const fetchWords = async () => {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=30"
    );
    const data = await response.json();

    let filteredWords = [];
    if (difficulty === "easy") {
      filteredWords = data.filter((word) => word.length >= 3 && word.length <= 5);
    } else if (difficulty === "medium") {
      filteredWords = data.filter((word) => word.length >= 6 && word.length <= 8);
    } else if (difficulty === "hard") {
      filteredWords = data.filter((word) => word.length >= 9);
    }

    // In case filtering removes all, fallback
    setWords(filteredWords.length > 0 ? filteredWords : data);
  };

  const startGame = () => {
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setUserInput("");
    setWpm(0);
    setAccuracy(100);
    setCurrentWordIndex(0);
    fetchWords();
  };

  useEffect(() => {
    if (timeLeft === 0 && hasStarted) {
      setIsGameOver(true);
    } else if (hasStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, hasStarted]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);

    if (event.target.value === words[currentWordIndex]) {
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
      if (currentWordIndex + 1 === words.length) {
        fetchWords();
      }
    }
  };

  useEffect(() => {
    if (score > 0 && (60 - timeLeft) > 0) {
      setWpm(Math.floor((score / (60 - timeLeft)) * 60));
    }
  }, [score, timeLeft]);

  useEffect(() => {
    if (userInput.length > 0 && words[currentWordIndex]) {
      const correctCharacters = userInput.split("").filter(
        (char, index) => char === words[currentWordIndex][index]
      ).length;
      const calculatedAccuracy = Math.floor(
        (correctCharacters / userInput.length) * 100
      );
      setAccuracy(calculatedAccuracy);
    }
  }, [userInput, currentWordIndex, words]);

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setHasStarted(true);
    startGame();
    inputRef.current?.focus();
  };

  const currentWord = words[currentWordIndex] || "";

  return (
<div
  className="flex flex-col items-center justify-center h-screen p-6 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/typingspeedgame.jpg')" }}
>
<Link to="/games">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-2 left-2 z-10" />
      </Link>
        <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">Typing Speed Test</h1>

      {!hasStarted ? (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-white mb-7 ">Select Difficulty</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleDifficultySelect("easy")}
              className="bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultySelect("medium")}
              className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultySelect("hard")}
              className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Hard
            </button>
          </div>
        </div>
      ) : !isGameOver ? (
        <div>
          <div className="text-lg mb-4">
            <p className="font-semibold text-gray-400">Time Left: {timeLeft}s</p>
            <p className="font-semibold text-gray-400">Score: {score}</p>
            <p className="font-semibold text-gray-400">WPM: {wpm}</p>
            <p className="font-semibold text-gray-400">Accuracy: {accuracy}%</p>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-semibold text-blue-400">Type the word below:</p>
            <div className="text-4xl font-bold mt-2 text-white">{currentWord}</div>
          </div>

          <input
            type="text"
            className="text-xl p-2 border border-gray-400 rounded mt-4 text-white"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
            ref={inputRef}
            disabled={isGameOver}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white">Game Over!</h2>
          <p className="text-lg font-semibold text-gray-400 mt-5 ">Final Score: {score}</p>
          <p className="text-lg font-semibold text-gray-400">WPM: {wpm}</p>
          <p className="text-lg font-semibold text-gray-400 mb-5 ">Accuracy: {accuracy}%</p>
          <button
            onClick={() => {
              setHasStarted(false);
              setDifficulty("");
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
