import React, { useState, useEffect } from 'react';

const ANIMALS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...ANIMALS, ...ANIMALS]
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isFlipped = (index: number) => {
    return flipped.includes(index) || solved.includes(index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">Memory Game</h2>
        <p className="text-gray-600">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer rounded-xl transition-all transform hover:scale-105
              ${isFlipped(index) 
                ? 'bg-white shadow-md' 
                : 'bg-purple-500 text-transparent'}`}
          >
            {isFlipped(index) ? card : '?'}
          </div>
        ))}
      </div>

      {solved.length === cards.length && (
        <div className="text-center mt-6">
          <p className="text-2xl font-bold text-green-500 mb-4">
            Congratulations! 🎉
          </p>
          <button
            onClick={initializeGame}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;