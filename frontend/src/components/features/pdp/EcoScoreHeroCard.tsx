import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';

export const EcoScoreHeroCard: React.FC<{ score: number; grade: string; confidence: number }> = ({ score, grade, confidence }) => {
  const getColorClass = (s: number) => {
    if (s >= 90) return 'text-eco-dark';
    if (s >= 70) return 'text-eco-primary';
    if (s >= 50) return 'text-eco-secondary';
    if (s >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBgClass = (s: number) => {
    if (s >= 90) return 'bg-eco-dark text-white';
    if (s >= 70) return 'bg-eco-primary text-white';
    if (s >= 50) return 'bg-eco-secondary text-white';
    if (s >= 30) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white relative overflow-hidden shadow-sm h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Overall EcoScore</h3>
        <div className="group relative cursor-pointer">
          <Info className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          <div className="absolute right-0 w-64 p-3 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
            EcoScore is a comprehensive ML-driven metric evaluating material sustainability, packaging efficiency, and supply chain emissions.
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Score Circle */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 ${getColorClass(score).replace('text-', 'border-')}`}
        >
          <span className={`text-4xl font-black ${getColorClass(score)}`}>{score}</span>
          <span className="text-xs text-gray-500 font-semibold uppercase">out of 100</span>
        </motion.div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 font-medium">EcoGrade:</span>
            <span className={`px-3 py-1 rounded-md font-bold text-lg ${getBgClass(score)}`}>
              {grade}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 font-medium">Confidence:</span>
            <span className="font-bold text-gray-900">{confidence}%</span>
          </div>

          <div className="flex items-center text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded w-max">
            <ShieldCheck className="w-4 h-4 mr-1" />
            ML Verified
          </div>
        </div>
      </div>
    </div>
  );
};
