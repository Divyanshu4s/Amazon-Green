import React from 'react';
import { Target, Gift } from 'lucide-react';

interface Props {
  goals: any[];
}

export const ActiveGoalsChallenges: React.FC<Props> = ({ goals }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center">
        <Target className="w-5 h-5 text-blue-500 mr-2" /> Active Sustainability Goals
      </h3>

      <div className="space-y-6">
        {goals.map(goal => {
          const progress = Math.min(100, (goal.current / goal.target) * 100);
          return (
            <div key={goal.id}>
              <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                <span>{goal.title}</span>
                <span>{goal.current.toFixed(1)} / {goal.target}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 font-semibold flex items-center">
                Reward: <Gift className="w-3 h-3 text-amazon-orange mx-1" /> {goal.reward} Coins
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
