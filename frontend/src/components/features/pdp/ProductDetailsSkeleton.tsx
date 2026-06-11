import React from 'react';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Gallery */}
        <div className="lg:col-span-4 flex gap-4">
          <div className="flex flex-col gap-2 w-20 flex-shrink-0">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-gray-200 rounded"></div>)}
          </div>
          <div className="flex-1 h-[500px] bg-gray-200 rounded-lg"></div>
        </div>

        {/* Center Column - Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-24 bg-gray-200 rounded-lg w-full mt-4"></div>
          
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        {/* Right Column - Buy Box */}
        <div className="lg:col-span-3">
          <div className="border border-gray-200 rounded-lg p-4 h-64 bg-gray-50">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded-full w-full mb-3"></div>
            <div className="h-10 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
