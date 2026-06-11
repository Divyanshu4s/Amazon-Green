import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Leaf } from 'lucide-react';

interface RewardCardProps {
  title: string;
  description: string;
  costInCredits: number;
  onRedeem: () => void;
  disabled?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({ title, description, costInCredits, onRedeem, disabled }) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`border rounded-lg p-4 flex flex-col ${disabled ? 'bg-gray-50 opacity-75' : 'bg-white shadow-sm'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="bg-eco-light p-2 rounded-full">
          <Gift className="w-5 h-5 text-eco-primary" />
        </div>
        <div className="flex items-center text-eco-primary font-bold">
          <Leaf className="w-4 h-4 mr-1" />
          {costInCredits}
        </div>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 flex-1 mb-4">{description}</p>
      
      <button 
        onClick={onRedeem}
        disabled={disabled}
        className={`w-full py-2 rounded-md font-semibold transition-colors ${
          disabled 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-eco-primary hover:bg-eco-dark text-white'
        }`}
      >
        {disabled ? 'Not enough credits' : 'Redeem Reward'}
      </button>
    </motion.div>
  );
};
