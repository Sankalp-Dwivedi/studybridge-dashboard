
import React from 'react';
import { Card } from "@/components/ui/card";
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  image?: string;
  category?: string;
  level?: string;
  students?: number;
  duration?: string;
  description?: string;
  lastAccessed?: string;
  variant?: 'compact' | 'full';
  status?: 'in-progress' | 'completed' | 'not-started';
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  progress,
  image,
  category,
  level,
  students,
  duration,
  description,
  lastAccessed,
  variant = 'compact',
  status = 'in-progress'
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-scholar-blue';
      case 'completed':
        return 'bg-scholar-green';
      case 'not-started':
        return 'bg-scholar-gray';
      default:
        return 'bg-scholar-blue';
    }
  };

  const getActionButton = () => {
    switch (status) {
      case 'in-progress':
        return (
          <Link to={`/course/${id}`} className="btn-primary flex items-center justify-center">
            Continue Learning
          </Link>
        );
      case 'completed':
        return (
          <Link to={`/course/${id}`} className="btn-secondary flex items-center justify-center">
            Review Course
          </Link>
        );
      case 'not-started':
        return (
          <Link to={`/course/${id}`} className="btn-primary flex items-center justify-center">
            Enroll Now
          </Link>
        );
      default:
        return (
          <Link to={`/course/${id}`} className="btn-primary flex items-center justify-center">
            Continue Learning
          </Link>
        );
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="card-hover overflow-hidden animate-scale-in">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-medium text-foreground">{title}</h3>
          <p className="text-sm text-scholar-gray">Instructor: {instructor}</p>
          
          <ProgressBar progress={progress} size="md" />
          
          {lastAccessed && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-scholar-gray">Last accessed: {lastAccessed}</span>
              <Link to={`/course/${id}`} className="px-4 py-1.5 text-sm bg-scholar-blue text-white rounded-lg transition-colors hover:bg-scholar-darkBlue">
                Continue
              </Link>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-hover overflow-hidden animate-scale-in">
      <div className="relative">
        <img 
          src={image || 'https://via.placeholder.com/400x200'} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-white text-scholar-darkGray rounded-full">
            {category}
          </span>
        )}
      </div>
      
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-medium text-foreground line-clamp-1">{title}</h3>
        <p className="text-sm text-scholar-gray">Instructor: {instructor}</p>
        
        {description && (
          <p className="text-sm text-scholar-darkGray line-clamp-2">{description}</p>
        )}
        
        {status === 'in-progress' && (
          <ProgressBar 
            progress={progress} 
            size="sm" 
            colorClass={getStatusColor(status)}
          />
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          {level && (
            <div className="text-xs">
              <span className="text-scholar-gray">Level: </span>
              <span className="font-medium">{level}</span>
            </div>
          )}
          
          {duration && (
            <div className="text-xs">
              <span className="text-scholar-gray">Duration: </span>
              <span className="font-medium">{duration}</span>
            </div>
          )}
          
          {students !== undefined && (
            <div className="text-xs">
              <span className="text-scholar-gray">Students: </span>
              <span className="font-medium">{students}</span>
            </div>
          )}
        </div>
        
        <div className="pt-3">
          {getActionButton()}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
