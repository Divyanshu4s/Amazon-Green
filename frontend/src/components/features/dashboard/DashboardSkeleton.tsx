import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
      </div>

      {/* Eco Level Banner */}
      <div className="h-48 bg-gray-800 rounded-xl mb-8"></div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
