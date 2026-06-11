import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  profile: any;
  scoreBreakdown: any[];
}

export const SellerEcoScoreCard: React.FC<Props> = ({ profile, scoreBreakdown }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-4 left-6">
        <h3 className="font-bold text-gray-900 text-lg">Seller EcoScore</h3>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 inline-block">
          {profile.scoreTrend} this month
        </span>
      </div>

      <div className="w-full h-64 mt-8 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" 
            barSize={10} data={scoreBreakdown} startAngle={90} endAngle={-270}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-gray-900">{profile.overallEcoScore}</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Overall</span>
        </div>
      </div>

      <div className="w-full mt-4 grid grid-cols-2 gap-2 text-xs">
        {scoreBreakdown.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.fill }}></span>
              <span className="text-gray-700 font-medium">{item.name}</span>
            </span>
            <span className="font-bold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
