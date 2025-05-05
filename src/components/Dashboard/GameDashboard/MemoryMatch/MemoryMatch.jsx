import { useEffect, useState } from "react";

const cardImages = [
  { src: "/images/1b3ca871504ea41d5490e0ab0b88a23a.jpg", matched: false },
  { src: "/images/1072911_2_s.jpg", matched: false },
  { src: "/images/abstract-design-with-colorful-patterns-nature-leaf-generated-by-ai.jpg", matched: false },
  { src: "/images/hobbys-erwachsene-malen-text-media2.jpg", matched: false },
  { src: "/images/palette-knife-birds.jpg", matched: false },
  { src: "/images/WhatsApp Image 2022-04-02 at 9.03.23 PM (2).jpeg", matched: false },
];

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  // Start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div
  className="p-6 flex flex-col items-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url('/memorygame.png')` }}
>
<h1 className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">
  Memory Match
</h1>

      <div className="grid grid-cols-4 gap-4 max-w-4xl">
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p className="text-white mt-6 text-lg font-semibold">Turns: {turns}</p>
      <button
        onClick={shuffleCards}
        className="mt-4 mb-6 bg-gradient-to-r from-blue-800 via-blue-400 to-white text-gray-700 font-semibold py-2 px-4 rounded transition-all duration-300 hover:from-red-500 hover:via-red-300 hover:to-white"
      >
        New Game
      </button>
    </div>
  );
}

function CardComponent({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative w-24 h-32 cursor-pointer" onClick={handleClick}>
      <div className={`absolute inset-0 transition-transform duration-300 ${flipped ? "rotate-y-180" : ""}`}>
        {flipped ? (
          <img src={card.src} alt="card front" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-400 via-white-900 to-blue"></div>        )}
      </div>
    </div>
  );
}
