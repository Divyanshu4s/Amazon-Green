import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EcoScoreBadgeProps {
  score: number;
  className?: string;
}

export const EcoScoreBadge: React.FC<EcoScoreBadgeProps> = ({ score, className }) => {
  // Determine color based on score
  let colorClass = 'bg-gray-200 text-gray-700'; // Default low score
  if (score >= 90) colorClass = 'bg-eco-dark text-white';
  else if (score >= 70) colorClass = 'bg-eco-primary text-white';
  else if (score >= 50) colorClass = 'bg-eco-secondary text-white';
  else if (score >= 30) colorClass = 'bg-yellow-500 text-white';
  else colorClass = 'bg-red-500 text-white';

  return (
    <div className={cn(
      "inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-bold shadow-sm",
      colorClass,
      className
    )}>
      <Leaf className="w-3 h-3 mr-1" />
      {score}/100
    </div>
  );
};
