import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  recommendations: any[];
}

export const AIImprovementRecommendations: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
        <h3 className="font-bold text-indigo-900 text-lg">AI Improvement Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-white rounded-lg p-4 border border-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
            <div className="mb-3 md:mb-0 pr-4">
              <h4 className="font-semibold text-gray-900 text-sm">{rec.action}</h4>
              <div className="flex space-x-4 mt-2">
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Impact: {rec.impact}</span>
                {rec.carbonSaved !== 'N/A' && (
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Prevents: {rec.carbonSaved}</span>
                )}
              </div>
            </div>
            <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors flex items-center">
              Take Action <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
