import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden h-72 flex flex-col">
          <div className="bg-gray-200 h-48 w-full"></div>
          <div className="p-4 flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="mt-auto h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
