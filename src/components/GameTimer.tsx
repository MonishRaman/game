import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

type GameTimerProps = {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive?: boolean;
};

const GameTimer: React.FC<GameTimerProps> = ({ duration, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Timer className="w-5 h-5" />
      <span className="font-mono text-lg">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default GameTimer;