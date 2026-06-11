import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any[];
}

export const CarbonTrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Carbon Savings Trend</h3>
          <p className="text-xs text-gray-500">Total CO₂ prevented per month (kg)</p>
        </div>
        <select className="border border-gray-300 rounded text-sm px-2 py-1 bg-gray-50">
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number) => [`${value} kg`, 'CO₂ Saved']}
            />
            <Area type="monotone" dataKey="co2" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
