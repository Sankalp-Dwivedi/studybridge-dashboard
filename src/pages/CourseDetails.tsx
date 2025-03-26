
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  allCourses, 
  courseChapters, 
  assignmentQuestions
} from '@/data/mockData';
import StudentHeader from '@/components/StudentHeader';
import ProgressBar from '@/components/ProgressBar';
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  AlignLeft, 
  Presentation, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');
  
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showAssignment, setShowAssignment] = useState<boolean>(false);
  const [assignmentCompleted, setAssignmentCompleted] = useState<boolean>(false);
  
  // Find the course
  const course = allCourses.find(c => c.id === courseId);
  
  // Get chapters for this course
  const chapters = courseChapters.find(c => c.courseId === courseId)?.chapters || [];
  
  // Get assignment questions
  const questions = assignmentQuestions[1] || [];
  
  if (!course) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }
  
  const toggleChapter = (chapterId: number) => {
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapterId);
    }
  };
  
  const startAssignment = (chapterId: number) => {
    setShowAssignment(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
  };
  
  const selectAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit assignment
      setAssignmentCompleted(true);
      setShowAssignment(false);
    }
  };
  
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle size={18} className="text-scholar-blue" />;
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'ppt':
        return <Presentation size={18} className="text-orange-500" />;
      case 'text':
      default:
        return <AlignLeft size={18} className="text-gray-500" />;
    }
  };
  
  const calculateCompletionPercentage = () => {
    const totalChapters = chapters.length;
    const completedChapters = chapters.filter(chapter => chapter.completed).length;
    return (completedChapters / totalChapters) * 100;
  };

  return (
    <div className="space-y-8">
      <StudentHeader 
        title={course.title}
        subtitle={`Instructor: ${course.instructor}`}
      />
      
      {showAssignment ? (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Assignment</h3>
                <p className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div 
                    className="bg-scholar-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    {questions[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div 
                        key={index}
                        className={`
                          p-4 border rounded-lg cursor-pointer transition-all
                          ${selectedAnswers[questions[currentQuestion].id] === index 
                            ? 'border-scholar-blue bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}
                        `}
                        onClick={() => selectAnswer(questions[currentQuestion].id, index)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`
                            h-5 w-5 rounded-full border flex items-center justify-center
                            ${selectedAnswers[questions[currentQuestion].id] === index 
                              ? 'border-scholar-blue bg-scholar-blue' 
                              : 'border-gray-300'}
                          `}>
                            {selectedAnswers[questions[currentQuestion].id] === index && (
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowAssignment(false)}
                  >
                    Cancel
                  </button>
                  
                  <button 
                    className="btn-primary"
                    onClick={nextQuestion}
                    disabled={selectedAnswers[questions[currentQuestion].id] === undefined}
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit'}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <div className="aspect-video relative bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                      <PlayCircle size={42} className="text-scholar-blue" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{course.title}</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-blue-50 px-3 py-1 rounded-full text-scholar-blue text-sm font-medium">
                      {course.category}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock size={16} />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users size={16} />
                      <span className="text-sm">{course.students} students</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Your Progress</h3>
                      <span className="text-sm text-gray-500">{course.progress}% Complete</span>
                    </div>
                    <ProgressBar progress={course.progress} size="md" />
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Course Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <BookOpen size={20} className="text-scholar-blue mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Course Level</h4>
                        <p className="text-sm text-gray-500">{course.level}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar size={20} className="text-scholar-blue mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                        <p className="text-sm text-gray-500">{course.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Users size={20} className="text-scholar-blue mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Students Enrolled</h4>
                        <p className="text-sm text-gray-500">{course.students} students</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">Course Completion</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-20 w-20">
                      <svg className="h-20 w-20" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E6E6E6"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          strokeDasharray={`${calculateCompletionPercentage()}, 100`}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-gray-900">
                        {Math.round(calculateCompletionPercentage())}%
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{chapters.filter(chapter => chapter.completed).length}</span> of <span className="font-medium">{chapters.length}</span> chapters completed
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Continue learning to complete the course
                      </p>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full">Continue Learning</button>
              </Card>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <Card>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Course Chapters</h3>
                    
                    <div className="space-y-4">
                      {chapters.map((chapter) => (
                        <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div 
                            className={`
                              flex items-center justify-between p-4 cursor-pointer
                              ${chapter.completed ? 'bg-green-50' : 'bg-white'}
                              ${expandedChapter === chapter.id ? 'border-b border-gray-200' : ''}
                            `}
                            onClick={() => toggleChapter(chapter.id)}
                          >
                            <div className="flex items-center space-x-3">
                              {chapter.completed ? (
                                <CheckCircle size={20} className="text-green-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                              )}
                              <h4 className="text-base font-medium text-gray-900">{chapter.title}</h4>
                            </div>
                            
                            {expandedChapter === chapter.id ? (
                              <ChevronDown size={20} className="text-gray-500" />
                            ) : (
                              <ChevronRight size={20} className="text-gray-500" />
                            )}
                          </div>
                          
                          {expandedChapter === chapter.id && (
                            <div className="p-4 space-y-4 bg-gray-50">
                              <div className="space-y-2">
                                {chapter.content.map((content) => (
                                  <div key={content.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-300 transition-colors">
                                    {getContentIcon(content.type)}
                                    <div>
                                      <h5 className="text-sm font-medium text-gray-900">{content.title}</h5>
                                      <p className="text-xs text-gray-500">
                                        {content.type === 'video' && `Video • ${content.duration}`}
                                        {content.type === 'pdf' && `PDF • ${content.pages} pages`}
                                        {content.type === 'ppt' && `Presentation • ${content.slides} slides`}
                                        {content.type === 'text' && 'Text Content'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="pt-2">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <div>
                                    <h5 className="text-sm font-medium text-gray-900">Chapter Assignment</h5>
                                    <p className="text-xs text-gray-500">
                                      {chapter.assignment.questions} questions • Required to complete the chapter
                                    </p>
                                  </div>
                                  
                                  {chapter.assignment.completed ? (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-700 font-medium">
                                        Score: {chapter.assignment.score}%
                                      </span>
                                      <CheckCircle size={18} className="text-green-500" />
                                    </div>
                                  ) : (
                                    <button 
                                      className="px-3 py-1 bg-scholar-blue text-white text-sm font-medium rounded-lg hover:bg-scholar-darkBlue transition-colors"
                                      onClick={() => startAssignment(chapter.id)}
                                    >
                                      Start
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="discussion">
                <Card className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Course Discussion</h3>
                  <p className="text-gray-500">
                    Discussion feature is coming soon. Check back later!
                  </p>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Course Resources</h3>
                  <p className="text-gray-500">
                    Additional resources for this course will be available soon.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
