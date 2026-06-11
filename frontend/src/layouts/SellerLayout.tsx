import React from 'react';
import { Outlet } from 'react-router-dom';

export const SellerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-eco-dark text-white flex-shrink-0 min-h-screen p-4 hidden md:block">
        <div className="font-bold text-xl mb-8">Seller Central</div>
        <nav className="space-y-2">
          <div className="p-2 rounded bg-eco-primary cursor-pointer">Dashboard</div>
          <div className="p-2 rounded hover:bg-eco-primary cursor-pointer">Inventory</div>
          <div className="p-2 rounded hover:bg-eco-primary cursor-pointer">Sustainability Audit</div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="font-semibold text-eco-dark">Green Seller Hub</div>
          <div className="flex items-center space-x-2">
            <span className="bg-eco-light text-eco-primary px-2 py-1 rounded text-xs font-bold">Climate Champion</span>
            <span>Seller</span>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
