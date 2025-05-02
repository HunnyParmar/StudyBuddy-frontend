import { useState, useEffect } from "react";
import wordsList from "./words.json";

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
      [0, 1],   // →
      [0, -1],  // ←
      [1, 0],   // ↓
      [-1, 0],  // ↑
      [1, 1],   // ↘
      [1, -1],  // ↙
      [-1, 1],  // ↗
      [-1, -1], // ↖
    ];
  
    for (let attempt = 0; attempt < 100; attempt++) {
      const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
  
      // Random start position
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
  
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;
  
        // Check bounds
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

    // Initialize empty grid
    const newGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => "")
    );

    // Pick and place 5 words
    const words = Array.from({ length: 5 }, () =>
      getRandomWord(4 + Math.floor(Math.random() * 4))
    );

    words.forEach((word) => placeWordInGrid(newGrid, word));

    // Fill remaining empty cells with random letters
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
    if (!isMouseDown) return;
    setSelectedCells((prev) => [...prev, [row, col]]);
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
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">🔤 Word Grid Hunt</h1>

      <div className="space-x-2">
        {Object.keys(difficulties).map((level) => (
          <button
            key={level}
            className={`px-3 py-1 rounded ${difficulty === level ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            onClick={() => setDifficulty(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div
        className="inline-block"
        onMouseLeave={() => setIsMouseDown(false)}
        onMouseUp={handleMouseUp}
      >
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid.length}, 2rem)` }}>
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => {
              const selected = isSelected(rIdx, cIdx);
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                  onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                  className={`w-8 h-8 flex items-center justify-center border text-lg font-bold cursor-pointer rounded ${
                    selected ? "bg-yellow-300" : "bg-white"
                  }`}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Words to Find:</h2>
        <ul className="list-disc pl-6">
          {wordsToFind.map((word, idx) => (
            <li key={idx} className={isFound(word) ? "line-through text-green-600" : ""}>
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordGridGame;
