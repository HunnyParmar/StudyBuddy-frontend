import { useState, useEffect } from "react";
import wordsList from "./words.json";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const difficulties = {
  easy: { size: 8 },
  medium: { size: 10 },
  hard: { size: 15 },
};

const getRandomWord = (length) => {
  const candidates = wordsList.filter((word) => word.length === length);
  return candidates[Math.floor(Math.random() * candidates.length)]?.toUpperCase() || "";
};

const placeWordInGrid = (grid, word) => {
  const size = grid.length;
  const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  for (let attempt = 0; attempt < 100; attempt++) {
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    let canPlace = true;
    for (let i = 0; i < word.length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) {
        canPlace = false;
        break;
      }
      const char = grid[nx][ny];
      if (char !== "" && char !== word[i]) {
        canPlace = false;
        break;
      }
    }

    if (canPlace) {
      for (let i = 0; i < word.length; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
        grid[nx][ny] = word[i];
      }
      return;
    }
  }

  console.warn(`⚠️ Failed to place word: ${word}`);
};

const WordGridGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [grid, setGrid] = useState([]);
  const [wordsToFind, setWordsToFind] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    generateGrid(difficulty);
  }, [difficulty]);

  const generateGrid = (level) => {
    const size = difficulties[level].size;
    const newGrid = Array.from({ length: size }, () => Array(size).fill(""));
    const words = Array.from({ length: 5 }, () =>
      getRandomWord(4 + Math.floor(Math.random() * 4))
    );

    words.forEach((word) => placeWordInGrid(newGrid, word));
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWordsToFind(words);
    setFoundWords([]);
  };

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    setSelectedCells([[row, col]]);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      setSelectedCells((prev) => [...prev, [row, col]]);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    const word = selectedCells.map(([r, c]) => grid[r][c]).join("");
    if (wordsToFind.includes(word) && !foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);
    }
    setSelectedCells([]);
  };

  const isSelected = (r, c) => selectedCells.some(([sr, sc]) => sr === r && sc === c);
  const isFound = (word) => foundWords.includes(word);

  return (
    <div
      className="p-6 flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/worldgridhuntgame.jpg')` }}
    >
      <Link to="/games">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-2 left-2 z-10" />
      </Link>
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-400 to-purple-700 bg-clip-text text-transparent">
        Word Grid Hunt
      </h1>

      <div className="flex gap-3 mb-6">
        {Object.keys(difficulties).map((level) => (
          <button
            key={level}
            className={`px-4 py-2 font-semibold rounded transition-all duration-300 ${
              difficulty === level
                ? "mt-5 bg-gradient-to-r from-purple-700 via-purple-400 to-white text-gray-900"
                : "mt-5 bg-white text-purple-800 hover:bg-purple-200"
            }`}
            onClick={() => setDifficulty(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={handleMouseUp}
        className="mb-6 overflow-auto"
      >
        <div
          className="mt-6 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${grid.length}, 2rem)` }}
        >
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => {
              const selected = isSelected(rIdx, cIdx);
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                  onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                  className={`w-8 h-8 flex items-center justify-center text-white border border-blue-300 rounded font-bold text-lg cursor-pointer transition-all duration-150 ${
                    selected ? "bg-purple-800 text-gray-900" : "bg-white-900 hover:bg-blue-600"
                  }`}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="text-white text-center w-full max-w-xl">
  <h2 className="text-2xl font-semibold mb-2">Words to Find:</h2>
  <div className="mt-3 grid grid-cols-2 justify-items-center text-lg">
    {wordsToFind.map((word, idx) => (
      <div
        key={idx}
        className={`${
          isFound(word) ? "text-yellow-400" : "text-white"
        }`}
      >
        {word}
      </div>
    ))}
  </div>
</div>
</div>
  );
};

export default WordGridGame;
