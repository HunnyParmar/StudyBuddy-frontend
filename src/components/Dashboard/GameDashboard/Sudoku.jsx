import React, { useState } from "react";
import "./SudokuGame.css"; // style grid

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
  const [grid, setGrid] = useState(() => {
    return initialPuzzle.map((row) => [...row]);
  });
  const [errors, setErrors] = useState([]);
  const [showSolution, setShowSolution] = useState(false); // State for showing solution

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
    <div className="sudoku-container">
      <h2>🧩 Sudoku Game</h2>
      <div className="gridd">
        {grid.map((row, r) => (
          <div key={r} className="row">
            {row.map((cell, c) => {
              const isPrefilled = initialPuzzle[r][c] !== 0;
              return isPrefilled || showSolution ? (
                <div key={c} className="cell prefilled">
                  {showSolution ? solution[r][c] : cell}
                </div>
              ) : (
                <input
                  key={c}
                  maxLength={1}
                  className={`cell input ${isError(r, c) ? "error" : ""}`}
                  value={grid[r][c] === 0 ? "" : grid[r][c]}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      <button className="show-solution-btn" onClick={handleShowSolution}>
        {showSolution ? "Hide Solution" : "Show Solution"}
      </button>
    </div>
  );
};

export default SudokuGame;
