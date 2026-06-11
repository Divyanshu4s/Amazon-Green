import React from 'react';
import { Lightbulb } from 'lucide-react';

export const CheckoutInsights: React.FC<{ insights: string[] }> = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4 flex items-center">
        <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" /> EcoCart Insights
      </h3>
      <ul className="space-y-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-100">
            <span className="text-eco-primary mr-2 mt-0.5">•</span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
};
