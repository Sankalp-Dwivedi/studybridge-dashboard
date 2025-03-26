
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  target?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  colorClass?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  target,
  size = 'md',
  showLabel = true,
  colorClass = 'bg-scholar-blue',
  className
}) => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-sm font-medium text-scholar-darkGray">{progress}%</span>
            {target && <span className="text-sm text-scholar-gray">Target: {target}%</span>}
          </div>
        )}
      </div>
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colorClass} rounded-full transition-all duration-500 ease-out ${sizes[size]}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
