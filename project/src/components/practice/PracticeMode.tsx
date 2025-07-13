import React, { useState } from 'react';
import { useGraph } from '../../context/GraphContext';
import QuestionCard from './QuestionCard';
import { Brain, Check, BookOpen, ArrowRight } from 'lucide-react';
import { Question } from '../../types';

const PracticeMode: React.FC = () => {
  const { concepts, questions, updateConceptMastery } = useGraph();
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);

  // Filter questions by selected concept
  const conceptQuestions = selectedConceptId
    ? questions.filter(q => q.conceptId === selectedConceptId)
    : [];

  const currentQuestion = conceptQuestions[currentQuestionIndex];
  
  const selectedConcept = selectedConceptId 
    ? concepts.find(c => c.id === selectedConceptId) 
    : null;

  const handleConceptSelect = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setPracticeComplete(false);
  };

  const handleAnswerSubmit = (answer: string | string[]) => {
    if (!currentQuestion) return;
    
    const newAnswers = { ...userAnswers, [currentQuestion.id]: answer };
    setUserAnswers(newAnswers);
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    setShowResults(false);
    
    if (currentQuestionIndex < conceptQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Practice session complete
      setPracticeComplete(true);
      
      // Update concept mastery based on performance
      if (selectedConceptId) {
        const correctAnswers = conceptQuestions.filter(q => {
          const userAnswer = userAnswers[q.id];
          if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
            return userAnswer.every(a => q.correctAnswer.includes(a)) && 
                   userAnswer.length === q.correctAnswer.length;
          }
          return userAnswer === q.correctAnswer;
        }).length;
        
        const percentCorrect = (correctAnswers / conceptQuestions.length) * 100;
        
        let newMastery: 'mastered' | 'review' | 'weak' = 'weak';
        if (percentCorrect >= 80) {
          newMastery = 'mastered';
        } else if (percentCorrect >= 50) {
          newMastery = 'review';
        }
        
        updateConceptMastery(selectedConceptId, newMastery);
      }
    }
  };

  const calculateScore = (): { correct: number, total: number, percentage: number } => {
    if (conceptQuestions.length === 0) {
      return { correct: 0, total: 0, percentage: 0 };
    }
    
    const correct = conceptQuestions.filter(q => {
      const userAnswer = userAnswers[q.id];
      if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
        return userAnswer.every(a => q.correctAnswer.includes(a)) && 
               userAnswer.length === q.correctAnswer.length;
      }
      return userAnswer === q.correctAnswer;
    }).length;
    
    return {
      correct,
      total: conceptQuestions.length,
      percentage: Math.round((correct / conceptQuestions.length) * 100)
    };
  };

  const getMasteryText = (percentage: number): string => {
    if (percentage >= 80) return 'Mastered!';
    if (percentage >= 50) return 'Needs Review';
    return 'Keep Practicing';
  };

  const getMasteryColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Practice Mode</h1>
          <p className="mt-2 text-gray-600">
            Test your knowledge by answering questions about specific concepts
          </p>
        </div>

        {!selectedConceptId ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <h2 className="text-lg font-medium text-blue-800">Select a Concept to Practice</h2>
              <p className="text-sm text-blue-600">Choose a concept to start practicing with targeted questions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {concepts.map(concept => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptSelect(concept.id)}
                  className="border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
                >
                  <div className="flex items-start mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 
                      ${concept.mastery === 'mastered' ? 'bg-green-100 text-green-600' : 
                        concept.mastery === 'review' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-red-100 text-red-600'}`}
                    >
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{concept.title}</h3>
                      <p className="text-xs text-gray-500">{concept.subject}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{concept.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full
                      ${concept.mastery === 'mastered' ? 'bg-green-100 text-green-800' : 
                        concept.mastery === 'review' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {concept.mastery === 'mastered' ? 'Mastered' : 
                       concept.mastery === 'review' ? 'Needs Review' : 'Weak'}
                    </span>
                    <div className="text-blue-600 text-sm flex items-center">
                      Practice <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : practiceComplete ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
              
              {selectedConcept && (
                <p className="text-gray-600 mb-6">
                  You've completed practice for <span className="font-medium">{selectedConcept.title}</span>
                </p>
              )}
              
              <div className="mb-8">
                <div className="text-5xl font-bold mb-1">
                  {calculateScore().percentage}%
                </div>
                <div className={`text-xl font-medium ${getMasteryColor(calculateScore().percentage)}`}>
                  {getMasteryText(calculateScore().percentage)}
                </div>
                <p className="text-gray-600 mt-2">
                  {calculateScore().correct} correct out of {calculateScore().total} questions
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedConceptId(null);
                    setPracticeComplete(false);
                  }}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Choose Another Concept
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setShowResults(false);
                    setPracticeComplete(false);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Practice Again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {selectedConcept && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">{selectedConcept.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedConceptId(null)}
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                  >
                    Choose different concept
                  </button>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {conceptQuestions.length}
                  </span>
                  <div className="ml-2 flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / conceptQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {currentQuestion && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <QuestionCard
                  question={currentQuestion}
                  onSubmit={handleAnswerSubmit}
                  showResult={showResults}
                  userAnswer={userAnswers[currentQuestion.id]}
                />
                
                {showResults && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      {currentQuestionIndex < conceptQuestions.length - 1 ? (
                        <>Next Question <ArrowRight size={16} className="ml-2" /></>
                      ) : (
                        <>Complete Practice <Check size={16} className="ml-2" /></>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeMode;