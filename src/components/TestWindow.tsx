
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { X, Clock, AlertTriangle, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestWindowProps {
  test: any;
  onClose: () => void;
  onComplete: (score: number, answers: any) => void;
}

const TestWindow: React.FC<TestWindowProps> = ({ test, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(test.duration ? test.duration * 60 : 45 * 60); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  // Get current question
  const currentQuestion = test.questions[currentQuestionIndex];

  // Handle answer selection
  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Auto-grade the test
  const gradeTest = () => {
    let score = 0;
    let totalPoints = 0;
    
    test.questions.forEach((question: any) => {
      totalPoints += question.points || 1;
      const userAnswer = answers[question.id];
      
      if (!userAnswer) return;
      
      if (question.type === 'mcq' && userAnswer === question.correctAnswer) {
        score += question.points || 1;
      } else if (question.type === 'truefalse' && userAnswer === question.correctAnswer) {
        score += question.points || 1;
      } else if (question.type === 'shortanswer') {
        // Basic string matching for short answers
        const userAnswerLower = userAnswer.toLowerCase().trim();
        const correctAnswerLower = question.correctAnswer.toLowerCase().trim();
        
        if (userAnswerLower === correctAnswerLower) {
          score += question.points || 1;
        } else if (question.alternativeAnswers && 
                  question.alternativeAnswers.some((alt: string) => 
                    alt.toLowerCase().trim() === userAnswerLower)) {
          score += question.points || 1;
        }
      }
      // Descriptive answers need manual grading
    });
    
    return Math.round((score / totalPoints) * 100);
  };

  // Handle final submission
  const handleSubmitTest = () => {
    if (Object.keys(answers).length < test.questions.length) {
      setShowConfirmation(true);
      return;
    }
    
    completeSubmission();
  };

  const completeSubmission = () => {
    setIsSubmitting(true);
    
    // Simulate a brief delay for submission processing
    setTimeout(() => {
      const scorePercent = gradeTest();
      onComplete(scorePercent, answers);
      setIsSubmitting(false);
    }, 1500);
  };

  // Render different question types
  const renderQuestionContent = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {currentQuestion.options.map((option: string, idx: number) => (
              <div
                key={idx}
                onClick={() => handleAnswerChange(idx)}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all",
                  answers[currentQuestion.id] === idx
                    ? "border-scholar-blue bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border flex items-center justify-center",
                      answers[currentQuestion.id] === idx
                        ? "border-scholar-blue bg-scholar-blue"
                        : "border-gray-300"
                    )}
                  >
                    {answers[currentQuestion.id] === idx && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'truefalse':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => handleAnswerChange(true)}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all",
                answers[currentQuestion.id] === true
                  ? "border-scholar-blue bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border flex items-center justify-center",
                    answers[currentQuestion.id] === true
                      ? "border-scholar-blue bg-scholar-blue"
                      : "border-gray-300"
                  )}
                >
                  {answers[currentQuestion.id] === true && (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-800 font-medium">True</span>
              </div>
            </div>
            
            <div
              onClick={() => handleAnswerChange(false)}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all",
                answers[currentQuestion.id] === false
                  ? "border-scholar-blue bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border flex items-center justify-center",
                    answers[currentQuestion.id] === false
                      ? "border-scholar-blue bg-scholar-blue"
                      : "border-gray-300"
                  )}
                >
                  {answers[currentQuestion.id] === false && (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-800 font-medium">False</span>
              </div>
            </div>
          </div>
        );
        
      case 'shortanswer':
        return (
          <div className="space-y-3">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md min-h-[100px] focus:border-scholar-blue focus:ring-1 focus:ring-scholar-blue"
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-500">Keep your answer brief and to the point. Typically one sentence or phrase.</p>
          </div>
        );
        
      case 'descriptive':
        return (
          <div className="space-y-3">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md min-h-[200px] focus:border-scholar-blue focus:ring-1 focus:ring-scholar-blue"
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            ></textarea>
            <p className="text-xs text-gray-500">
              Explain your answer in detail. Your response will be reviewed by your instructor.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-white z-50 p-6 sm:p-8 flex flex-col max-w-4xl mx-auto">
        <Card className="w-full p-6 sm:p-8 mt-20">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <AlertCircle size={40} className="text-amber-500" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              You haven't answered all questions
            </h2>
            
            <p className="text-center text-gray-600">
              You've only answered {Object.keys(answers).length} out of {test.questions.length} questions. 
              Are you sure you want to submit your test?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                variant="outline"
                onClick={() => setShowConfirmation(false)}
              >
                Continue Test
              </Button>
              
              <Button 
                variant="default"
                onClick={completeSubmission}
              >
                Submit Anyway
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 sm:p-8 flex flex-col max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{test.title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Clock size={16} className="text-gray-600" />
            <span className={`text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (Object.keys(answers).length > 0) {
                setShowConfirmation(true);
              } else {
                onClose();
              }
            }}
          >
            <X size={20} />
          </Button>
        </div>
      </div>
      
      {/* Progress */}
      <div className="mt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </span>
          <span className="sm:hidden flex items-center space-x-1">
            <Clock size={14} className="text-gray-600" />
            <span className={`text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {/* Question */}
      <Card className="flex-grow overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {currentQuestion?.type === 'mcq' ? 'Multiple Choice' : 
                 currentQuestion?.type === 'truefalse' ? 'True/False' :
                 currentQuestion?.type === 'shortanswer' ? 'Short Answer' : 'Descriptive'}
              </span>
              
              {currentQuestion?.points && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900">{currentQuestion?.question}</h2>
            
            {currentQuestion?.description && (
              <p className="text-gray-600 text-sm">{currentQuestion.description}</p>
            )}
          </div>
          
          {renderQuestionContent()}
        </div>
      </Card>
      
      {/* Footer */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-3">
          {currentQuestionIndex < test.questions.length - 1 ? (
            <Button onClick={handleNextQuestion}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestWindow;
