import React from 'react';
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  data: any[];
}

export const PlatformAnalyticsCharts: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Platform Green Adoption Trend</h3>
        <p className="text-xs text-gray-500">Green Orders vs Standard Orders over time</p>
      </div>

      <div className="flex-1 w-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `${val/1000}k`} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name]}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            
            <Bar dataKey="standardOrders" barSize={20} fill="#E5E7EB" name="Standard Orders" />
            <Area type="monotone" dataKey="greenOrders" fill="url(#colorGreen)" stroke="#2E7D32" strokeWidth={3} name="Green Orders" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
