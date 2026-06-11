import React from 'react';

export const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse bg-gray-50 min-h-screen">
      <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
        <div className="md:col-span-2 h-32 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Climate Tracker */}
      <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="h-96 bg-gray-200 rounded-xl"></div>
        <div className="h-96 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl"></div>
        <div className="lg:col-span-1 h-96 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};
