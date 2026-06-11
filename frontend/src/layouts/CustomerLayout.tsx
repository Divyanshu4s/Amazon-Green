import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
