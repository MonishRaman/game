import React, { useState, useEffect } from 'react';
import GameTimer from './GameTimer';

const WORDS = [
  { word: 'REACT', hint: 'A JavaScript library for building user interfaces' },
  { word: 'PYTHON', hint: 'A programming language named after a snake' },
  { word: 'ALGORITHM', hint: 'A step-by-step procedure to solve a problem' },
  { word: 'DATABASE', hint: 'A structured collection of data' },
  { word: 'JAVASCRIPT', hint: 'A programming language for the web' },
];

const WordScramble: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [hint, setHint] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  const scrambleWord = (word: string) => {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const generateNewWord = () => {
    const wordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(wordObj.word);
    setHint(wordObj.hint);
    setScrambledWord(scrambleWord(wordObj.word));
    setGuess('');
    setFeedback('');
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  const handleSubmit = () => {
    if (guess.toUpperCase() === currentWord) {
      setScore(score + 100);
      setFeedback('Correct! 🎉');
      if (score + 100 >= level * 300) {
        setLevel(level + 1);
      }
      setTimeout(generateNewWord, 1500);
    } else {
      setFeedback('Try again! 🤔');
    }
  };

  const handleTimeUp = () => {
    setFeedback('Time\'s up! The word was: ' + currentWord);
    setTimeout(generateNewWord, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Word Scramble</h2>
          <p className="text-gray-600">Level {level}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Score: {score}</p>
          <GameTimer duration={60} onTimeUp={handleTimeUp} />
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4 tracking-wider">
          {scrambledWord}
        </div>
        <p className="text-gray-600 italic">Hint: {hint}</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          className="w-full text-center text-2xl p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Your answer..."
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>

      {feedback && (
        <div className={`text-center text-xl mb-4 ${
          feedback.includes('Correct') ? 'text-green-500' : 'text-orange-500'
        }`}>
          {feedback}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Check Answer
      </button>
    </div>
  );
};

export default WordScramble;