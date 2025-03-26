
import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from 'lucide-react';

interface AssignmentCardProps {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'late';
  onClick?: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  id,
  title,
  subject,
  dueDate,
  status,
  onClick
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status styling
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          label: 'Completed'
        };
      case 'late':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          label: 'Late'
        };
      case 'pending':
      default:
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          label: 'Due'
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <Card 
      className="card-hover overflow-hidden animate-fade-in"
      onClick={onClick}
    >
      <div className="p-4 flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-medium text-scholar-blue px-2 py-0.5 bg-blue-50 rounded-full">
              {subject}
            </span>
            <h3 className="mt-2 text-base font-medium text-foreground">{title}</h3>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-scholar-gray">
            <Calendar size={14} className="mr-1" />
            <span className="text-xs">Due: {formatDate(dueDate)}</span>
          </div>
          
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyles.bgColor} ${statusStyles.textColor}`}>
            {statusStyles.label}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AssignmentCard;
