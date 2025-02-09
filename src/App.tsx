import React, { useState } from 'react';
import GameCard from './components/GameCard';
import MathGame from './components/MathGame';
import MemoryGame from './components/MemoryGame';
import QuizGame from './components/QuizGame';
import WordScramble from './components/WordScramble';
import SpeedTyping from './components/SpeedTyping';
import Profile, { ProfileData } from './components/Profile';
import Leaderboard, { LeaderboardEntry } from './components/Leaderboard';
import { GraduationCap, User, Trophy } from 'lucide-react';

type GameType = 'menu' | 'math' | 'memory' | 'quiz' | 'wordscramble' | 'speedtyping' | 'leaderboard';

function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // Mock leaderboard data - in a real app, this would come from a database
  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      username: "speedmaster",
      displayName: "Speed Master",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      score: 2500,
      game: "Speed Typing"
    },
    {
      username: "mathwiz",
      displayName: "Math Wizard",
      avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
      score: 1800,
      game: "Math Challenge"
    },
    {
      username: "memorypro",
      displayName: "Memory Pro",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      score: 2100,
      game: "Memory Match"
    }
  ]);

  const renderGame = () => {
    switch (currentGame) {
      case 'math':
        return <MathGame />;
      case 'memory':
        return <MemoryGame />;
      case 'quiz':
        return <QuizGame />;
      case 'wordscramble':
        return <WordScramble />;
      case 'speedtyping':
        return <SpeedTyping />;
      case 'leaderboard':
        return <Leaderboard entries={leaderboard} />;
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
            <GameCard
              title="Word Scramble"
              description="Unscramble words and expand your vocabulary!"
              icon="quiz"
              onClick={() => setCurrentGame('wordscramble')}
            />
            <GameCard
              title="Speed Typing"
              description="Improve your typing speed and accuracy!"
              icon="quiz"
              onClick={() => setCurrentGame('speedtyping')}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-12 h-12 text-white" />
              <h1 className="text-4xl font-bold text-white">EduPlay</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentGame('leaderboard')}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              >
                <Trophy className="w-6 h-6" />
                <span>Leaderboard</span>
              </button>
              
              {profile ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-colors"
                >
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.displayName} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <span>{profile.displayName}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span>Create Profile</span>
                </button>
              )}
            </div>
          </div>

          {currentGame !== 'menu' && currentGame !== 'leaderboard' && (
            <button
              onClick={() => setCurrentGame('menu')}
              className="text-white hover:text-indigo-200 font-semibold mb-6"
            >
              ← Back to Games
            </button>
          )}

          {renderGame()}
        </div>
      </div>

      {showProfile && (
        <Profile
          onClose={() => setShowProfile(false)}
          onSave={setProfile}
          initialData={profile}
        />
      )}
    </div>
  );
}

export default App;