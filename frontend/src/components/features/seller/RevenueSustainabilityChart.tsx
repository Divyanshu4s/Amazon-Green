import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  data: any[];
}

export const RevenueSustainabilityChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Revenue vs. Sustainability</h3>
        <p className="text-xs text-gray-500">Correlation between your EcoScore growth and sales</p>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `$${val/1000}k`} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              formatter={(value: number, name: string) => {
                if (name === 'ecoScore') return [value, 'EcoScore'];
                return [`$${value.toLocaleString()}`, name === 'revenue' ? 'Total Revenue' : 'Green Revenue'];
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            
            <Area yAxisId="left" type="monotone" dataKey="revenue" fill="url(#colorRev)" stroke="#3B82F6" strokeWidth={2} name="Total Revenue" />
            <Area yAxisId="left" type="monotone" dataKey="sustainableRevenue" fill="transparent" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Green Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="ecoScore" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} name="EcoScore" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
