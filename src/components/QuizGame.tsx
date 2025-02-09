import React, { useState } from 'react';

const QUESTIONS = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Earth"],
    correct: 1
  },
  {
    question: "Which gas do plants absorb from the air?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 1
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2
  }
];

const QuizGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUESTIONS.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">Quiz Complete!</h2>
          <p className="text-4xl font-bold mb-6">
            You scored {score} out of {QUESTIONS.length}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-emerald-600">Knowledge Quiz</h2>
              <p className="text-gray-600">
                Question {currentQuestion + 1}/{QUESTIONS.length}
              </p>
            </div>
            <p className="text-xl font-semibold mb-6">
              {QUESTIONS[currentQuestion].question}
            </p>
          </div>

          <div className="grid gap-4">
            {QUESTIONS[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizGame;