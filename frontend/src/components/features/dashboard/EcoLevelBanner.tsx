import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Lock } from 'lucide-react';

interface Props {
  ecoLevel: any;
}

export const EcoLevelBanner: React.FC<Props> = ({ ecoLevel }) => {
  const progressPercent = Math.min(100, (ecoLevel.points / ecoLevel.pointsRequired) * 100);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-eco-dark rounded-xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
        <Shield className="w-96 h-96" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between">
        
        <div className="flex-1 mb-6 md:mb-0">
          <div className="text-amazon-orange font-bold uppercase tracking-widest text-xs mb-2 flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" /> Current Rank
          </div>
          <h2 className="text-4xl font-black mb-2">{ecoLevel.current}</h2>
          <p className="text-gray-300 text-sm max-w-md">
            You are in the top 12% of EcoCart users. Keep making sustainable choices to unlock exclusive benefits.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>{ecoLevel.points} XP</span>
            <span className="text-gray-400">{ecoLevel.pointsRequired} XP to {ecoLevel.nextLevel}</span>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-4 mb-4 border border-gray-700 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="bg-gradient-to-r from-amazon-orange to-yellow-400 h-full rounded-full"
            />
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 backdrop-blur-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Next Level Perks
            </h4>
            <ul className="text-sm space-y-1">
              {ecoLevel.benefits.map((b: string, i: number) => (
                <li key={i} className="flex items-center text-gray-200">
                  <span className="text-amazon-orange mr-2">✓</span> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
