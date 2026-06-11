import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 min-h-screen p-4 hidden md:block">
        <div className="font-bold text-xl mb-8">EcoCart Admin</div>
        <nav className="space-y-2">
          <div className="p-2 rounded bg-gray-800 cursor-pointer">Dashboard</div>
          <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">Users</div>
          <div className="p-2 rounded hover:bg-gray-800 cursor-pointer">Audits</div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="font-semibold">Platform Management</div>
          <div>Admin User</div>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
