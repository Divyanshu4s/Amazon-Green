import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface Props {
  history: any[];
  currentStatus: string;
}

export const AuditStatusPanel: React.FC<Props> = ({ history, currentStatus }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">ML Verification Audit</h3>
          <p className="text-xs text-gray-500">Automated sustainability compliance check</p>
        </div>
        <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
          <CheckCircle className="w-4 h-4 mr-2" /> {currentStatus}
        </div>
      </div>

      <div className="flex-1 w-full h-24 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3 mt-auto">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Audit History</h4>
        {history.slice().reverse().map((audit, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <span className="flex items-center text-gray-700 font-medium">
              <Clock className="w-4 h-4 mr-2 text-gray-400" /> {audit.date}
            </span>
            <span className="font-bold text-gray-900">{audit.score} / 100</span>
          </div>
        ))}
      </div>
    </div>
  );
};
