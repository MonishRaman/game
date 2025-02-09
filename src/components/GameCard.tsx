import React from 'react';
import { Brain, Calculator, BookOpen } from 'lucide-react';

type GameCardProps = {
  title: string;
  description: string;
  icon: 'math' | 'memory' | 'quiz' | 'brain';
  onClick: () => void;
};

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, onClick }) => {
  const getIcon = () => {
    switch (icon) {
      case 'math':
        return <Calculator className="w-8 h-8 text-indigo-500" />;
      case 'memory':
        return <Brain className="w-8 h-8 text-purple-500" />;
      case 'quiz':
        return <BookOpen className="w-8 h-8 text-emerald-500" />;
      case 'brain':
        return <Brain className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default GameCard;