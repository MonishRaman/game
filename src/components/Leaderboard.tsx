import React from 'react';
import { Trophy, Medal } from 'lucide-react';

export type LeaderboardEntry = {
  username: string;
  displayName: string;
  avatarUrl: string;
  score: number;
  game: string;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  currentGame?: string;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentGame }) => {
  const filteredEntries = currentGame 
    ? entries.filter(entry => entry.game === currentGame)
    : entries;

  const sortedEntries = [...filteredEntries].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          {currentGame ? `${currentGame} Leaderboard` : 'Global Leaderboard'}
        </h2>
      </div>

      <div className="space-y-4">
        {sortedEntries.map((entry, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-12 text-center">
              {index < 3 ? (
                <Medal className={`w-8 h-8 mx-auto ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              ) : (
                <span className="text-xl font-bold text-gray-500">
                  {index + 1}
                </span>
              )}
            </div>

            <div className="flex-shrink-0">
              {entry.avatarUrl ? (
                <img 
                  src={entry.avatarUrl} 
                  alt={entry.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              )}
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold text-gray-800">
                {entry.displayName}
              </h3>
              <p className="text-sm text-gray-500">@{entry.username}</p>
            </div>

            <div className="flex-shrink-0 text-right">
              <span className="text-2xl font-bold text-indigo-600">
                {entry.score}
              </span>
              <p className="text-sm text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;