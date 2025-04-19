
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  label, 
  showPercentage = true,
  size = 'md'
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Get height based on size
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-4';
      default: return 'h-3';
    }
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1 text-sm">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-medium">{normalizedValue}%</span>}
        </div>
      )}
      <Progress value={normalizedValue} className={getHeight()} />
    </div>
  );
};

export default ProgressBar;
