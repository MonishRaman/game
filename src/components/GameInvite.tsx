import React from 'react';
import { TowerControl as Controller, X } from 'lucide-react';
import { playSound } from '../utils/sounds';

type GameInviteProps = {
  from: {
    displayName: string;
    avatarUrl?: string;
  };
  game: string;
  onAccept: () => void;
  onDecline: () => void;
};

const GameInvite: React.FC<GameInviteProps> = ({
  from,
  game,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 animate-slide-up">
      <div className="flex items-center gap-3 mb-3">
        {from.avatarUrl ? (
          <img
            src={from.avatarUrl}
            alt={from.displayName}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{from.displayName}</h3>
          <p className="text-sm text-gray-500">invites you to play</p>
        </div>
        <Controller className="w-6 h-6 text-indigo-600 ml-auto" />
      </div>

      <p className="text-lg font-medium text-center mb-4">{game}</p>

      <div className="flex gap-2">
        <button
          onClick={() => {
            playSound('notification');
            onAccept();
          }}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Accept
        </button>
        <button
          onClick={() => {
            playSound('click');
            onDecline();
          }}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default GameInvite;