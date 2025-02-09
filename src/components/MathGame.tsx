import React, { useState, useEffect } from 'react';

const MathGame: React.FC = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<'+' | '-' | '×'>('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateProblem = () => {
    const operations: ('+' | '-' | '×')[] = ['+', '-', '×'];
    const newOperation = operations[Math.floor(Math.random() * operations.length)];
    let n1 = Math.floor(Math.random() * 12) + 1;
    let n2 = Math.floor(Math.random() * 12) + 1;
    
    if (newOperation === '-' && n1 < n2) {
      [n1, n2] = [n2, n1];
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperation(newOperation);
    setAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const checkAnswer = () => {
    let correctAnswer;
    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '×':
        correctAnswer = num1 * num2;
        break;
    }

    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');
      setTimeout(generateProblem, 1500);
    } else {
      setFeedback('Try again! 🤔');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">Math Challenge</h2>
        <p className="text-gray-600">Score: {score}</p>
      </div>
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4">
          {num1} {operation} {num2} = ?
        </div>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-center text-2xl p-2 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
      </div>

      {feedback && (
        <div className={`text-center text-xl mb-4 ${feedback.includes('Correct') ? 'text-green-500' : 'text-orange-500'}`}>
          {feedback}
        </div>
      )}

      <button
        onClick={checkAnswer}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Check Answer
      </button>
    </div>
  );
};

export default MathGame;