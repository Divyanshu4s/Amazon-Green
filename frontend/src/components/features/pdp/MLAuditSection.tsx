import React from 'react';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export const MLAuditSection: React.FC<{ audit: any }> = ({ audit }) => {
  if (!audit) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-6 h-6 text-indigo-600" />
        <h3 className="font-bold text-gray-900 text-lg">Machine Learning Audit Report</h3>
      </div>
      
      <div className="flex items-center space-x-6 mb-6">
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Risk Level</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-sm">
            {audit.riskLevel} Risk of Greenwashing
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            Verified Strengths
          </h4>
          <ul className="space-y-2">
            {audit.strengths.map((s: string, i: number) => (
              <li key={i} className="text-sm text-gray-600 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
                {s}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {audit.improvements.map((s: string, i: number) => (
              <li key={i} className="text-sm text-gray-600 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
