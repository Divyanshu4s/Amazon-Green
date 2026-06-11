import React from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  badges: any[];
}

export const BadgeShowcase: React.FC<Props> = ({ badges }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Your Badges & Achievements</h3>
        <span className="text-sm font-bold text-amazon-orange hover:underline cursor-pointer">View All</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {badges.map((badge, idx) => (
          <motion.div 
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex flex-col items-center p-4 rounded-xl text-center border relative ${badge.locked ? 'bg-gray-50 border-gray-200 opacity-70 grayscale' : 'bg-green-50 border-green-100 hover:shadow-md transition-shadow'}`}
          >
            {badge.locked && <Lock className="absolute top-2 right-2 w-4 h-4 text-gray-400" />}
            
            <div className="text-4xl mb-3">{badge.icon}</div>
            <h4 className="font-bold text-xs text-gray-900 mb-1 h-8 flex items-center justify-center">{badge.name}</h4>
            
            {badge.locked ? (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-amazon-orange h-1.5 rounded-full" style={{ width: `${badge.progress}%` }}></div>
              </div>
            ) : (
              <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full mt-1">Unlocked</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
