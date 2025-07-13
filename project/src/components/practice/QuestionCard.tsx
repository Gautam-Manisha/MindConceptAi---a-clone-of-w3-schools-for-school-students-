import React, { useState } from 'react';
import { Question } from '../../types';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onSubmit: (answer: string | string[]) => void;
  showResult: boolean;
  userAnswer?: string | string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onSubmit, 
  showResult,
  userAnswer
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  
  const isCorrect = () => {
    if (!userAnswer) return false;
    
    if (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)) {
      return userAnswer.every(a => question.correctAnswer.includes(a)) && 
             userAnswer.length === question.correctAnswer.length;
    }
    
    return userAnswer === question.correctAnswer;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentAnswer);
  };
  
  const handleMultipleChoiceChange = (option: string) => {
    setCurrentAnswer(option);
  };
  
  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAnswer(e.target.value);
  };
  
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3 mt-4">
            {question.options?.map((option, index) => (
              <div key={index} className="relative">
                <label
                  className={`flex items-center p-4 border rounded-md cursor-pointer transition-all
                    ${!showResult && currentAnswer === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
                    ${showResult && userAnswer === option ? 
                      (option === question.correctAnswer ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}
                    ${showResult && option === question.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                  `}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={currentAnswer === option}
                    onChange={() => handleMultipleChoiceChange(option)}
                    disabled={showResult}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3">{option}</span>
                  
                  {showResult && option === question.correctAnswer && (
                    <Check size={18} className="ml-auto text-green-600" />
                  )}
                  {showResult && userAnswer === option && option !== question.correctAnswer && (
                    <X size={18} className="ml-auto text-red-600" />
                  )}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'short-answer':
        return (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type your answer here..."
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={handleShortAnswerChange}
              disabled={showResult}
              className={`w-full p-3 border rounded-md ${
                showResult ? (isCorrect() ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-300'
              }`}
            />
            
            {showResult && (
              <div className={`mt-2 p-3 rounded-md ${isCorrect() ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-start">
                  <div className={`p-1 rounded-full ${isCorrect() ? 'bg-green-200' : 'bg-red-200'} mr-2`}>
                    {isCorrect() ? <Check size={16} className="text-green-700" /> : <X size={16} className="text-red-700" />}
                  </div>
                  <div>
                    <p className={`font-medium ${isCorrect() ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect() ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm mt-1">
                      Correct answer: <span className="font-medium">{question.correctAnswer}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      
      <form onSubmit={handleSubmit}>
        {renderQuestionInput()}
        
        {showResult && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Explanation</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
        
        {!showResult && (
          <div className="mt-6">
            <button
              type="submit"
              disabled={!currentAnswer}
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                currentAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuestionCard;