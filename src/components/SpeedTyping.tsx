import React, { useState, useEffect } from 'react';
import GameTimer from './GameTimer';

const TEXTS = [
  "The quick brown fox jumps over the lazy dog",
  "To be or not to be, that is the question",
  "All that glitters is not gold",
  "A journey of a thousand miles begins with a single step",
  "Where there is a will, there is a way"
];

const SpeedTyping: React.FC = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const generateNewText = () => {
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    setInput('');
    setIsActive(true);
  };

  useEffect(() => {
    generateNewText();
  }, []);

  useEffect(() => {
    if (input === text) {
      const words = text.split(' ').length;
      const chars = text.length;
      const accuracy = (chars - countErrors()) / chars * 100;
      const wpm = Math.round((words / (60 - timer)) * 60);
      
      setWpm(wpm);
      setAccuracy(Math.round(accuracy));
      setScore(score + Math.round(wpm * (accuracy / 100)));
      
      if (score + wpm >= level * 200) {
        setLevel(level + 1);
      }
      
      setTimeout(generateNewText, 1500);
    }
  }, [input]);

  const countErrors = () => {
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) errors++;
    }
    return errors;
  };

  const handleTimeUp = () => {
    setIsActive(false);
    generateNewText();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-purple-600">Speed Typing</h2>
          <p className="text-gray-600">Level {level}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-gray-600">WPM: {wpm}</p>
            <p className="text-gray-600">Accuracy: {accuracy}%</p>
          </div>
          <GameTimer duration={60} onTimeUp={handleTimeUp} isActive={isActive} />
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-medium text-gray-800">{text}</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-4 text-lg border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
        placeholder="Start typing..."
      />

      <div className="mt-4 text-center">
        <p className="text-xl font-semibold text-purple-600">
          Score: {score}
        </p>
      </div>
    </div>
  );
};

export default SpeedTyping;