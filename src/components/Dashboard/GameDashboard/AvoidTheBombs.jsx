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

  // Timer effect
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
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/bombgame.jpg')", }}
    >
      <div className="p-6 text-center">
        <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-yellow-100 via-red-300 to-purple-600 bg-clip-text text-transparent">
          💣 Avoid the Bombs
        </h1>

        <div className="mb-4 text-lg">
          <label className="mr-2 font-semibold">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 rounded text-white font-semibold border mr-5"
          >
            <option value="easy">Easy (5x5)</option>
            <option value="medium">Medium (7x7)</option>
            <option value="hard">Hard (10x10)</option>
          </select>
          <button
            onClick={initializeGame}
            className="ml-4 px-4 py-2 bg-pink-300 text-black rounded hover:bg-white"
          >
            Restart
          </button>
        </div>

        <div className="mb-7 mt-7 font-small text-xl text-pink-100">
          Time: {time}s| Safe Clicks: {score} | Bombs Left: {bombsLeft}
        </div>

        <div
          className="grid gap-1 justify-center"
          style={{ gridTemplateColumns: `repeat(${size}, 40px)` }}
        >
          {grid.map((cell, index) => {
            const isRevealed = revealed.has(index);
            const className = `w-10 h-10 flex items-center justify-center border rounded ${
              gameOver && cell.isBomb
                ? "bg-red-600 text-white"
                : isRevealed
                ? "bg-pink-300 text-black"
                : "bg-gray-200 hover:bg-gray-300 text-black"
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
          <div className="mt-6 text-3xl font-bold text-red-400">Game Over!</div>
        )}
      </div>
    </div>
  );
}

export default AvoidTheBombs;
