import React, { useEffect, useState } from "react";

const difficulties = {
  easy: { size: 5, bombs: 5 },
  medium: { size: 7, bombs: 10 },
  hard: { size: 10, bombs: 20 },
};

function AvoidTheBombs() {
  const [difficulty, setDifficulty] = useState("easy");
  const [grid, setGrid] = useState([]);
  const [bombsLeft, setBombsLeft] = useState(0);
  const [revealed, setRevealed] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Start timer
  useEffect(() => {
    if (!timerStarted || gameOver) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerStarted, gameOver]);

  const initializeGame = () => {
    const { size, bombs } = difficulties[difficulty];
    const totalCells = size * size;
    const bombPositions = new Set();

    while (bombPositions.size < bombs) {
      bombPositions.add(Math.floor(Math.random() * totalCells));
    }

    const newGrid = Array.from({ length: totalCells }, (_, i) => ({
      isBomb: bombPositions.has(i),
    }));

    setGrid(newGrid);
    setRevealed(new Set());
    setBombsLeft(bombs);
    setScore(0);
    setGameOver(false);
    setTime(0);
    setTimerStarted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const handleClick = (index) => {
    if (gameOver || revealed.has(index)) return;
    if (!timerStarted) setTimerStarted(true);

    if (grid[index].isBomb) {
      setGameOver(true);
      alert("💥 You clicked a bomb! Game Over.");
      return;
    }

    const newRevealed = new Set(revealed);
    newRevealed.add(index);
    setRevealed(newRevealed);
    setScore(newRevealed.size);
  };

  const { size } = difficulties[difficulty];

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">💣 Avoid the Bombs</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="easy">Easy (5x5)</option>
          <option value="medium">Medium (7x7)</option>
          <option value="hard">Hard (10x10)</option>
        </select>
        <button
          onClick={initializeGame}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Restart
        </button>
      </div>

      <div className="mb-4 font-medium text-lg">
        ⏱️ Time: {time}s | ✅ Safe Clicks: {score} | 💣 Bombs Left: {bombsLeft}
      </div>

      <div
        className="grid gap-1 justify-center"
        style={{ gridTemplateColumns: `repeat(${size}, 40px)` }}
      >
        {grid.map((cell, index) => {
          const isRevealed = revealed.has(index);
          const className = `w-10 h-10 flex items-center justify-center border ${
            gameOver && cell.isBomb
              ? "bg-red-600 text-white"
              : isRevealed
              ? "bg-green-300"
              : "bg-gray-200 hover:bg-gray-300"
          }`;

          return (
            <div
              key={index}
              className={className}
              onClick={() => handleClick(index)}
            >
              {gameOver && cell.isBomb ? "💣" : isRevealed ? "✓" : ""}
            </div>
          );
        })}
      </div>

      {gameOver && (
        <div className="mt-4 text-xl font-bold text-red-600">Game Over!</div>
      )}
    </div>
  );
}

export default AvoidTheBombs;
