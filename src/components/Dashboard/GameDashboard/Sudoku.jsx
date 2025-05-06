import React, { useState } from "react";
import "./SudokuGame.css"; // optional if you're not fully using Tailwind
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const SudokuGame = () => {
  const [grid, setGrid] = useState(() => initialPuzzle.map((row) => [...row]));
  const [errors, setErrors] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleChange = (row, col, value) => {
    if (initialPuzzle[row][col] !== 0) return;

    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) return;

    const newGrid = [...grid];
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  const handleSubmit = () => {
    const newErrors = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (
          initialPuzzle[row][col] === 0 &&
          grid[row][col] !== solution[row][col]
        ) {
          newErrors.push(`${row}-${col}`);
        }
      }
    }

    setErrors(newErrors);
    if (newErrors.length === 0) {
      alert("🎉 You solved the puzzle correctly!");
    } else {
      alert("❌ Some numbers are incorrect. Check the red cells.");
    }
  };

  const isError = (row, col) => errors.includes(`${row}-${col}`);

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: `url('/sudokugame.jpg')` }}
    >
      <Link to="/games">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-2 left-2 z-10" />
      </Link>
      <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-yellow-100 via-red-300 to-pink-500 bg-clip-text text-transparent">
        🧩 Sudoku Game
      </h2>

      <div className="grid grid-cols-9 gap-1 bg-white/20 p-3 rounded-md shadow-lg">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isPrefilled = initialPuzzle[r][c] !== 0;
            return isPrefilled || showSolution ? (
              <div
                key={`${r}-${c}`}
                className="w-10 h-10 flex items-center justify-center font-bold text-xl text-white bg-purple-800 rounded"
              >
                {showSolution ? solution[r][c] : cell}
              </div>
            ) : (
              <input
                key={`${r}-${c}`}
                maxLength={1}
                value={grid[r][c] === 0 ? "" : grid[r][c]}
                onChange={(e) => handleChange(r, c, e.target.value)}
                className={`w-10 h-10 text-center text-lg font-semibold text-purple-900 bg-white border-2 rounded focus:outline-none ${
                  isError(r, c) ? "border-red-500" : "border-purple-300"
                }`}
              />
            );
          })
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Submit
        </button>
        <button
          onClick={handleShowSolution}
          className="mt-4 bg-yellow-200 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded shadow"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
      </div>
    </div>
  );
};

export default SudokuGame;
