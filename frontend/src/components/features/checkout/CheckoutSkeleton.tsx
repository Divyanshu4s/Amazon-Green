import React from 'react';

export const CheckoutSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-64"></div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-48"></div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-48"></div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-gray-900 rounded-xl h-48 mb-6"></div>
          <div className="bg-white border border-gray-200 rounded-lg h-96"></div>
        </div>
      </div>
    </div>
  );
};
