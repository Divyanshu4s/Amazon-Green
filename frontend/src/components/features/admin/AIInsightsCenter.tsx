import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  insights: string[];
}

export const AIInsightsCenter: React.FC<Props> = ({ insights }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-xl p-6 shadow-sm mb-8 h-full">
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-purple-300 mr-2" />
        <h3 className="font-bold text-lg">AI Platform Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-lg flex items-start">
            <span className="text-purple-300 mr-3 text-lg leading-none mt-0.5">•</span>
            <span className="text-sm font-medium text-indigo-50 leading-relaxed">{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
