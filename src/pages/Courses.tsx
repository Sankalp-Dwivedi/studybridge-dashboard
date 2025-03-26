
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  allCourses, 
  courseCategories, 
  courseLevels 
} from '@/data/mockData';
import CourseCard from '@/components/CourseCard';
import StudentHeader from '@/components/StudentHeader';
import { BookOpen, Search, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const myCourses = allCourses.filter(course => course.status === 'in-progress');
  const recommendedCourses = allCourses.filter((_, index) => index % 2 === 0); // Just for demo purposes

  return (
    <div className="space-y-8">
      <StudentHeader 
        title="Courses"
        subtitle="Discover and enroll in a wide range of educational content"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scholar-blue focus:border-transparent w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="btn-primary flex items-center space-x-2">
          <BookOpen size={18} />
          <span>View Curriculum</span>
        </button>
      </div>

      <Tabs defaultValue="all-courses" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="all-courses">All Courses</TabsTrigger>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scholar-blue focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {courseCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scholar-blue focus:border-transparent"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {courseLevels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
          
          <button className="btn-secondary flex items-center space-x-2">
            <SlidersHorizontal size={18} />
            <span>More Filters</span>
          </button>
        </div>

        <TabsContent value="all-courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                image={course.image}
                category={course.category}
                level={course.level}
                students={course.students}
                duration={course.duration}
                description={course.description}
                variant="full"
                status={course.status}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                image={course.image}
                category={course.category}
                level={course.level}
                students={course.students}
                duration={course.duration}
                description={course.description}
                variant="full"
                status={course.status}
              />
            ))}
          </div>

          {myCourses.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-gray-500">You are not enrolled in any courses yet.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                image={course.image}
                category={course.category}
                level={course.level}
                students={course.students}
                duration={course.duration}
                description={course.description}
                variant="full"
                status={course.status}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
