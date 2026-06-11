import React from 'react';
import { Award, Leaf, TrendingUp } from 'lucide-react';

interface Props {
  profile: any;
  impact: any;
}

export const SellerHeroSection: React.FC<Props> = ({ profile, impact }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center md:items-start">
      
      <div className="flex flex-col mb-6 md:mb-0">
        <div className="text-xs font-bold uppercase tracking-widest text-amazon-orange mb-2 flex items-center">
          <Award className="w-4 h-4 mr-1" /> {profile.badge}
        </div>
        <h1 className="text-3xl font-black mb-2">{profile.businessName}</h1>
        <div className="flex items-center text-sm text-gray-300">
          <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded border border-green-700/50 mr-3">Rank #{profile.rank}</span>
          <span className="flex items-center"><Leaf className="w-4 h-4 mr-1 text-eco-primary" /> {profile.tier} Tier</span>
        </div>
      </div>

      <div className="flex space-x-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 font-semibold uppercase mb-1">Total Carbon Prevented</span>
          <span className="text-2xl font-black text-green-400 flex items-center">
            {impact.carbonPrevented} <span className="text-sm ml-1 text-gray-400">kg</span>
          </span>
        </div>
        <div className="w-px bg-white/20"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 font-semibold uppercase mb-1">Green Orders</span>
          <span className="text-2xl font-black text-blue-400 flex items-center">
            {(impact.greenOrders / 1000).toFixed(1)}k <TrendingUp className="w-4 h-4 ml-2 text-blue-400" />
          </span>
        </div>
      </div>

    </div>
  );
};
