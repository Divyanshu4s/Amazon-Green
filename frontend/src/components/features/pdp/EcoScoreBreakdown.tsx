import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface BreakdownItem {
  name: string;
  score: number;
  fill: string;
}

export const EcoScoreBreakdown: React.FC<{ data: BreakdownItem[] }> = ({ data }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-gray-900 text-lg mb-4">Score Breakdown</h3>
      
      <div className="flex-1 min-h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={15} 
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="score"
              cornerRadius={10}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}/100`, 'Score']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
