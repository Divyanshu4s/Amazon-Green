import React from 'react';

export const SellerDashboardSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="h-80 bg-gray-200 rounded-xl"></div>
        <div className="h-80 bg-gray-200 rounded-xl"></div>
        <div className="h-80 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl"></div>
        <div className="lg:col-span-1 h-96 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Bottom */}
      <div className="h-48 bg-gray-200 rounded-xl mb-8"></div>
      <div className="h-64 bg-gray-200 rounded-xl"></div>
    </div>
  );
};
