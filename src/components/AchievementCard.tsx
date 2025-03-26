
import React from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle, Medal, Star, Calendar, Trophy } from 'lucide-react';

interface AchievementCardProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  icon?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  id,
  title,
  description,
  date,
  icon = 'check-circle'
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'medal':
        return <Medal className="text-scholar-blue" />;
      case 'star':
        return <Star className="text-scholar-yellow" />;
      case 'calendar-check':
        return <Calendar className="text-scholar-green" />;
      case 'trophy':
        return <Trophy className="text-scholar-blue" />;
      case 'check-circle':
      default:
        return <CheckCircle className="text-scholar-green" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="card-hover overflow-hidden animate-fade-in border-l-4 border-l-scholar-blue">
      <div className="p-4 flex items-start space-x-4">
        <div className="mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          <p className="text-sm text-scholar-gray mt-1">{description}</p>
          
          {date && (
            <p className="text-xs text-scholar-gray mt-2">
              Awarded on {formatDate(date)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;
