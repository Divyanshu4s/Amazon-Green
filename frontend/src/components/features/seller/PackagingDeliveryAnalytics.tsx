import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  data: any[];
}

export const PackagingDeliveryAnalytics: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Customer Packaging Choices</h3>
        <p className="text-xs text-gray-500">Adoption rate of Eco Packaging by your buyers</p>
      </div>

      <div className="flex-1 w-full min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} formatter={(val) => [`${val}%`, 'Adoption']} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-[-36px]">
          <span className="text-3xl font-black text-gray-900">{data[0].value}%</span>
        </div>
      </div>
    </div>
  );
};
