import React from 'react';
import { Users, Store, ShoppingBag, Globe2, TrendingUp } from 'lucide-react';

interface Props {
  kpis: any;
}

export const PlatformHeroKPIs: React.FC<Props> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Users</span>
          <Users className="w-5 h-5 text-blue-500" />
        </div>
        <div className="text-2xl font-black text-gray-900">{(kpis.totalUsers / 1000).toFixed(1)}k</div>
        <div className="text-xs text-green-600 font-semibold mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +12% this month</div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Sellers</span>
          <Store className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="text-2xl font-black text-gray-900">{(kpis.totalSellers / 1000).toFixed(1)}k</div>
        <div className="text-xs text-gray-500 font-semibold mt-2">{kpis.verifiedSellers} Verified Green</div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Green Orders</span>
          <ShoppingBag className="w-5 h-5 text-eco-primary" />
        </div>
        <div className="text-2xl font-black text-gray-900">{(kpis.greenOrders / 1000).toFixed(1)}k</div>
        <div className="text-xs text-gray-500 font-semibold mt-2">{Math.round((kpis.greenOrders / kpis.totalOrders) * 100)}% of total orders</div>
      </div>

      <div className="bg-gradient-to-br from-green-800 to-eco-dark text-white rounded-xl p-6 shadow-sm lg:col-span-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
          <Globe2 className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex justify-between h-full items-center">
          <div>
            <div className="text-xs text-green-200 font-bold uppercase tracking-wider mb-2">Platform EcoScore</div>
            <div className="text-4xl font-black">{kpis.platformEcoScore} <span className="text-lg text-green-200">/ 100</span></div>
          </div>
          <div className="text-right">
            <div className="text-xs text-green-200 font-bold uppercase tracking-wider mb-2">Climate Impact</div>
            <div className="text-4xl font-black">{kpis.climateImpactScore} <span className="text-lg text-green-200">/ 100</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};
