import { useEffect, useState } from "react";

const colorItems = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "lime"];
const numberItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const wordItems = ["cat", "dog", "tree", "book", "star", "ball", "pen", "moon", "car", "lamp", "fish", "rose"];

export default function SequenceMemoryGame() {
  const [mode, setMode] = useState("color");
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState("Choose a mode to start");
  const [isGameActive, setIsGameActive] = useState(false);

  const items = mode === "color" ? colorItems : mode === "number" ? numberItems : wordItems;

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setLevel(1);
    setMessage("Watch the sequence...");
    setIsGameActive(true);
  };

  useEffect(() => {
    if (level > 0 && isGameActive) {
      const newItem = items[Math.floor(Math.random() * items.length)];
      const newSequence = [...sequence, newItem];
      setSequence(newSequence);
      setUserSequence([]);
      playSequence(newSequence);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const playSequence = (seq) => {
    setIsUserTurn(false);
    let i = 0;
    const interval = setInterval(() => {
      flashItem(seq[i]);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUserTurn(true);
          setMessage("Your Turn!");
        }, 300);
      }
    }, 900);
  };

  const flashItem = (item) => {
    const el = document.getElementById(item);
    if (el) {
      el.classList.add("opacity-50", "scale-105");
      setTimeout(() => el.classList.remove("opacity-50", "scale-105"), 400);
    }
  };

  const handleUserClick = (item) => {
    if (!isUserTurn) return;
    const newUserSequence = [...userSequence, item];
    setUserSequence(newUserSequence);
    flashItem(item);

    if (item !== sequence[newUserSequence.length - 1]) {
      setMessage("Wrong! Game Over.");
      setIsGameActive(false);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setMessage("Good job! Next level...");
      setTimeout(() => setLevel((prev) => prev + 1), 1000);
    }
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsGameActive(false);
    setSequence([]);
    setUserSequence([]);
    setLevel(0);
    setMessage("Click Start to Begin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">🧠 Sequence Memory Challenge</h1>

      {/* Mode Selection */}
      <div className="flex gap-3 mb-4">
        {["color", "number", "word"].map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded ${
              mode === m ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => handleModeChange(m)}
          >
            {m[0].toUpperCase() + m.slice(1)} Mode
          </button>
        ))}
      </div>

      <p className="mb-4 text-lg font-medium">{message}</p>

      {/* Game Grid */}
      <div
        className={`grid gap-4 mb-6 ${
          mode === "color" ? "grid-cols-3" : "grid-cols-4"
        }`}
      >
        {items.map((item) => (
          <button
            key={item}
            id={item}
            className={`w-20 h-20 rounded-md text-lg font-bold flex items-center justify-center
              ${
                mode === "color"
                  ? `${getColorClass(item)} text-white`
                  : "bg-white border border-gray-400 text-gray-800"
              }`}
            onClick={() => handleUserClick(item)}
          >
            {mode !== "color" && item}
          </button>
        ))}
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded"
        onClick={startGame}
        disabled={isGameActive && isUserTurn}
      >
        {level === 0 || !isGameActive ? "Start Game" : `Level ${level}`}
      </button>
    </div>
  );
}

const getColorClass = (color) => {
  return {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    pink: "bg-pink-400",
    cyan: "bg-cyan-400",
    lime: "bg-lime-400",
  }[color] || "bg-gray-300";
};
