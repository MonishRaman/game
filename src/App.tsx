import React, { useState } from 'react';
import GameCard from './components/GameCard';
import MathGame from './components/MathGame';
import MemoryGame from './components/MemoryGame';
import QuizGame from './components/QuizGame';
import { GraduationCap } from 'lucide-react';

type GameType = 'menu' | 'math' | 'memory' | 'quiz';

function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');

  const renderGame = () => {
    switch (currentGame) {
      case 'math':
        return <MathGame />;
      case 'memory':
        return <MemoryGame />;
      case 'quiz':
        return <QuizGame />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            <GameCard
              title="Math Challenge"
              description="Practice arithmetic with fun, interactive problems!"
              icon="math"
              onClick={() => setCurrentGame('math')}
            />
            <GameCard
              title="Memory Match"
              description="Boost your memory by matching pairs of cards!"
              icon="memory"
              onClick={() => setCurrentGame('memory')}
            />
            <GameCard
              title="Knowledge Quiz"
              description="Test your knowledge across various subjects!"
              icon="quiz"
              onClick={() => setCurrentGame('quiz')}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">EduPlay</h1>
          </div>
          {currentGame !== 'menu' && (
            <button
              onClick={() => setCurrentGame('menu')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              ← Back to Games
            </button>
          )}
        </div>

        {renderGame()}
      </div>
    </div>
  );
}

export default App;