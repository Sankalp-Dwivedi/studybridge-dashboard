
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestResultsProps {
  test: any;
  score: number;
  answers: Record<number, any>;
  onClose: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({ test, score, answers, onClose }) => {
  // Get grade letter based on score
  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  // Check if answer is correct
  const isCorrectAnswer = (question: any, userAnswer: any) => {
    if (question.type === 'descriptive') return 'pending';
    
    if (question.type === 'mcq' && userAnswer === question.correctAnswer) {
      return true;
    }
    
    if (question.type === 'truefalse' && userAnswer === question.correctAnswer) {
      return true;
    }
    
    if (question.type === 'shortanswer') {
      const userAnswerLower = userAnswer.toLowerCase().trim();
      const correctAnswerLower = question.correctAnswer.toLowerCase().trim();
      
      if (userAnswerLower === correctAnswerLower) {
        return true;
      }
      
      if (question.alternativeAnswers && 
          question.alternativeAnswers.some((alt: string) => 
            alt.toLowerCase().trim() === userAnswerLower)) {
        return true;
      }
    }
    
    return false;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 sm:p-8 flex flex-col max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Test Results</h1>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold mb-2 mt-4 flex items-baseline">
            <span className={getScoreColor(score)}>{score}</span>
            <span className="text-gray-400 text-xl">%</span>
          </div>
          
          <div className="text-2xl font-semibold">
            Grade: <span className={getScoreColor(score)}>{getGrade(score)}</span>
          </div>
          
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full",
                  score >= 90 ? "bg-green-500" : 
                  score >= 80 ? "bg-blue-500" : 
                  score >= 70 ? "bg-yellow-500" : 
                  score >= 60 ? "bg-orange-500" : "bg-red-500"
                )}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Questions Review */}
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        
        <div className="space-y-6">
          {test.questions.map((question: any, index: number) => {
            const userAnswer = answers[question.id];
            const answerStatus = userAnswer !== undefined ? isCorrectAnswer(question, userAnswer) : 'unanswered';
            
            return (
              <Card key={question.id} className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Question {index + 1}
                      </span>
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {question.type === 'mcq' ? 'Multiple Choice' : 
                         question.type === 'truefalse' ? 'True/False' :
                         question.type === 'shortanswer' ? 'Short Answer' : 'Descriptive'}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
                  </div>
                  
                  <div>
                    {answerStatus === true ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                        <Check size={16} className="text-green-600" />
                      </div>
                    ) : answerStatus === false ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                        <X size={16} className="text-red-600" />
                      </div>
                    ) : answerStatus === 'pending' ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
                        <AlertCircle size={16} className="text-yellow-600" />
                      </div>
                    ) : (
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        Not answered
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  {/* Your Answer */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Your Answer:</h4>
                    {userAnswer !== undefined ? (
                      <div className="text-gray-800 p-3 bg-gray-50 rounded-md">
                        {question.type === 'mcq' ? (
                          <span>{question.options[userAnswer]}</span>
                        ) : question.type === 'truefalse' ? (
                          <span>{userAnswer ? 'True' : 'False'}</span>
                        ) : (
                          <span>{userAnswer}</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic p-3 bg-gray-50 rounded-md">
                        No answer provided
                      </div>
                    )}
                  </div>
                  
                  {/* Correct Answer */}
                  {answerStatus !== 'pending' && answerStatus !== true && question.correctAnswer !== undefined && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</h4>
                      <div className="text-gray-800 p-3 bg-green-50 rounded-md">
                        {question.type === 'mcq' ? (
                          <span>{question.options[question.correctAnswer]}</span>
                        ) : question.type === 'truefalse' ? (
                          <span>{question.correctAnswer ? 'True' : 'False'}</span>
                        ) : (
                          <span>{question.correctAnswer}</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Explanation */}
                  {question.explanation && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Explanation:</h4>
                      <div className="text-gray-800 p-3 bg-blue-50 rounded-md">
                        {question.explanation}
                      </div>
                    </div>
                  )}
                  
                  {/* Manual Grading Message */}
                  {answerStatus === 'pending' && (
                    <div className="flex items-center p-3 bg-yellow-50 rounded-md">
                      <AlertCircle size={16} className="text-yellow-600 mr-2" />
                      <span className="text-yellow-800 text-sm">
                        This question requires manual grading by your instructor.
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-6 flex justify-center">
        <Button onClick={onClose}>
          Back to Tests
        </Button>
      </div>
    </div>
  );
};

export default TestResults;
