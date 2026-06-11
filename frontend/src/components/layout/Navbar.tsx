import React, { useState } from 'react';
import { ShoppingCart, User, Search, Leaf, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { items } = useCartStore();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-[#131921] text-white w-full z-50 sticky top-0 shadow-xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 max-w-[1600px] mx-auto">
        
        {/* Logo Area */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4 hover:text-eco-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2 text-2xl font-black tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-eco-primary p-1.5 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-sans">EcoCart <span className="text-amazon-orange font-bold">AI</span></span>
          </Link>
        </div>

        {/* Search Bar - Premium Amazon Style */}
        <div className="hidden md:flex flex-1 max-w-3xl mx-10 relative group shadow-sm rounded-lg overflow-hidden focus-within:shadow-amazon-orange/50 focus-within:shadow-md transition-shadow">
          <div className="bg-gray-100 text-gray-700 px-4 py-2.5 flex items-center border-r border-gray-300 font-medium text-sm cursor-pointer hover:bg-gray-200 transition-colors">
            All
          </div>
          <input 
            type="text" 
            placeholder="Search for sustainable, eco-friendly products..." 
            className="w-full px-4 py-2.5 text-gray-900 focus:outline-none"
          />
          <button className="bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 px-5 transition-colors flex items-center justify-center">
            <Search className="w-5 h-5 font-bold" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          
          {/* Eco Filter Toggle */}
          <div className="hidden lg:flex flex-col items-center cursor-pointer group">
            <div className="flex items-center space-x-1 text-eco-light group-hover:text-eco-secondary transition-colors">
              <Leaf className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">EcoMode</span>
            </div>
            <div className="w-10 h-4 bg-gray-700 rounded-full mt-1 relative border border-gray-600">
              <div className="absolute right-0 top-0 w-4 h-4 bg-eco-secondary rounded-full transform scale-110 shadow-lg"></div>
            </div>
          </div>

          <Link to="/dashboard" className="flex flex-col items-start hover:text-amazon-orange transition-colors group cursor-pointer">
            <span className="text-[11px] text-gray-300 group-hover:text-white transition-colors">Hello, {user ? user.name : 'Sign In'}</span>
            <span className="text-sm font-bold flex items-center tracking-tight">
              Account & Lists
            </span>
          </Link>

          <Link to="/cart" className="relative flex items-end hover:text-amazon-orange transition-colors group">
            <div className="relative">
              <ShoppingCart className="w-9 h-9" strokeWidth={1.5} />
              <span className="absolute -top-2 -right-1.5 bg-amazon-orange text-gray-900 font-black text-xs rounded-full h-[22px] min-w-[22px] px-1 flex items-center justify-center border-2 border-[#131921] shadow-sm">
                {cartItemCount}
              </span>
            </div>
            <span className="text-sm font-bold ml-1 hidden sm:block mb-1 tracking-tight">Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar - Categories */}
      <div className="bg-[#232F3E] text-sm px-4 flex items-center space-x-6 overflow-x-auto whitespace-nowrap shadow-inner border-t border-gray-700">
        <div className="max-w-[1600px] mx-auto w-full flex items-center space-x-6 py-2.5">
          <Link to="/products" className="hover:text-amazon-orange hover:border-white border-transparent border border-solid p-1 rounded-sm font-bold flex items-center transition-all">
            <Menu className="w-4 h-4 mr-1.5" /> All
          </Link>
          <Link to="/products" className="hover:text-amazon-orange font-bold flex items-center text-eco-secondary">
            <Leaf className="w-4 h-4 mr-1" /> Green Best Sellers
          </Link>
          <Link to="/products?category=home" className="hover:text-white text-gray-300 font-medium">Eco Home</Link>
          <Link to="/products?category=fashion" className="hover:text-white text-gray-300 font-medium">Sustainable Fashion</Link>
          <Link to="/rewards" className="hover:text-white text-gray-300 font-medium">Green Rewards</Link>
          <Link to="/sellers" className="hover:text-white text-gray-300 font-medium">Verified Green Sellers</Link>
        </div>
      </div>

      {/* Mobile Menu Placeholder */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#232F3E] p-4 absolute w-full left-0 border-b border-gray-700 shadow-2xl transition-all">
          <div className="flex flex-col space-y-5">
             <div className="flex w-full relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-3 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="bg-amazon-orange text-gray-900 px-5 rounded-r-md font-bold">
                <Search className="w-5 h-5" />
              </button>
            </div>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-white flex items-center text-lg"><Leaf className="w-5 h-5 mr-3 text-eco-secondary"/> Green Best Sellers</Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-medium text-lg border-t border-gray-600 pt-4">Account & Lists</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
