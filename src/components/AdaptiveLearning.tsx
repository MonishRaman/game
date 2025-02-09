import React, { useState, useEffect } from 'react';
import { Brain, Book, Award, Target, BarChart } from 'lucide-react';
import { playSound } from '../utils/sounds';

type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading';
type Subject = 'math' | 'science' | 'history' | 'coding';
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface Question {
  id: string;
  type: 'quiz' | 'puzzle' | 'simulation' | 'roleplay';
  subject: Subject;
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  learningStyle: LearningStyle;
  visualAid?: string;
  audioUrl?: string;
}

const AdaptiveLearning: React.FC = () => {
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');
  const [subject, setSubject] = useState<Subject>('math');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulated AI-driven question generation
  const generateQuestion = () => {
    const questions: Record<Subject, Question[]> = {
      math: [
        {
          id: '1',
          type: 'puzzle',
          subject: 'math',
          content: 'If a train travels at 60 km/h, how long will it take to cover 180 km?',
          options: ['2 hours', '3 hours', '4 hours', '5 hours'],
          correctAnswer: '3 hours',
          explanation: 'Using the formula: Time = Distance ÷ Speed, we get 180 ÷ 60 = 3 hours',
          difficulty: 'beginner',
          learningStyle: 'visual',
          visualAid: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800'
        },
        // Add more questions...
      ],
      science: [
        {
          id: '2',
          type: 'simulation',
          subject: 'science',
          content: 'What happens to water molecules when they are heated?',
          options: [
            'They move faster',
            'They stop moving',
            'They disappear',
            'They change color'
          ],
          correctAnswer: 'They move faster',
          explanation: 'When water molecules are heated, their kinetic energy increases, causing them to move faster.',
          difficulty: 'beginner',
          learningStyle: 'visual',
          visualAid: 'https://images.unsplash.com/photo-1603356033288-acfcb54801e6?w=800'
        },
        // Add more questions...
      ],
      history: [
        // Add history questions...
      ],
      coding: [
        // Add coding questions...
      ]
    };

    const availableQuestions = questions[subject].filter(q => 
      q.difficulty === difficulty && q.learningStyle === learningStyle
    );

    setCurrentQuestion(
      availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    );
  };

  useEffect(() => {
    generateQuestion();
  }, [subject, difficulty, learningStyle]);

  const handleAnswer = (selectedAnswer: string) => {
    setAnswer(selectedAnswer);
    
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswer) {
      playSound('correct');
      setScore(score + (difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 20 : 30));
      setStreak(streak + 1);
      setFeedback('Correct! 🎉');
      setProgress(progress + 10);
      
      // Award badges based on achievements
      if (streak === 5) {
        setBadges([...badges, '5 Streak! 🔥']);
        playSound('levelUp');
      }
      
      if (score >= 100 && difficulty === 'beginner') {
        setDifficulty('intermediate');
        setBadges([...badges, 'Level Up! 🌟']);
        playSound('levelUp');
      }
    } else {
      playSound('wrong');
      setStreak(0);
      setFeedback('Try again! 🤔');
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setAnswer('');
    setFeedback('');
    setShowExplanation(false);
    generateQuestion();
  };

  // AI-driven learning style detection based on performance patterns
  const adaptLearningStyle = () => {
    // Simplified example - in production, this would use more sophisticated AI
    const styles: LearningStyle[] = ['visual', 'auditory', 'kinesthetic', 'reading'];
    const newStyle = styles[(styles.indexOf(learningStyle) + 1) % styles.length];
    setLearningStyle(newStyle);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-indigo-600">Adaptive Learning</h2>
            <p className="text-gray-600">
              Learning Style: {learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-2xl font-bold text-indigo-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-orange-500">🔥 {streak}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {['math', 'science', 'history', 'coding'].map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s as Subject)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                subject === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {badges.length > 0 && (
          <div className="flex gap-2 mb-6">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {currentQuestion && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm mb-2">
              {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1)}
            </span>
            <h3 className="text-xl font-semibold mb-4">{currentQuestion.content}</h3>
            
            {currentQuestion.visualAid && learningStyle === 'visual' && (
              <img
                src={currentQuestion.visualAid}
                alt="Visual aid"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  answer === option
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`p-4 rounded-lg mb-4 ${
              feedback.includes('Correct')
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {feedback}
            </div>
          )}

          {showExplanation && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <div className="flex gap-4">
              <button
                onClick={nextQuestion}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Next Question
              </button>
              <button
                onClick={adaptLearningStyle}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Learning Style
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdaptiveLearning;