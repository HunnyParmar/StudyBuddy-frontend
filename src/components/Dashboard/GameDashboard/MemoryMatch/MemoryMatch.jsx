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
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🧠 Memory Match</h1>

      <button
        onClick={shuffleCards}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        New Game
      </button>

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

      <p className="mt-6 text-lg font-semibold">Turns: {turns}</p>
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
          <img src="/images/images (2).jpeg" alt="card back" className="w-full h-full object-cover rounded-lg" />
        )}
      </div>
    </div>
  );
}
