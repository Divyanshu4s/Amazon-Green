import React from 'react';
import { Target, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  pledge: any;
}

export const ClimatePledgeTracker: React.FC<Props> = ({ pledge }) => {
  const carbonPercent = Math.min(100, (pledge.carbonSavedKg / pledge.targetCarbonKg) * 100);
  const plasticPercent = Math.min(100, (pledge.plasticReducedKg / pledge.targetPlasticKg) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg flex items-center">
          <Target className="w-5 h-5 text-eco-primary mr-2" /> Global Climate Pledge 2026
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">On Track</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Carbon Tracker */}
        <div>
          <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
            <span>Carbon Neutrality Goal (CO₂ Saved)</span>
            <span>{(pledge.carbonSavedKg / 1000000).toFixed(1)}M / {(pledge.targetCarbonKg / 1000000).toFixed(1)}M kg</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden border border-gray-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${carbonPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-green-500 h-full rounded-full"
            />
          </div>
          <div className="text-xs text-gray-500 font-semibold flex items-center mt-2">
            <Leaf className="w-3 h-3 text-green-500 mr-1" /> Equals {pledge.treesEquivalent.toLocaleString()} trees planted
          </div>
        </div>

        {/* Plastic Tracker */}
        <div>
          <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
            <span>Zero Waste Goal (Plastic Avoided)</span>
            <span>{(pledge.plasticReducedKg / 1000000).toFixed(1)}M / {(pledge.targetPlasticKg / 1000000).toFixed(1)}M kg</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden border border-gray-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${plasticPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="bg-blue-500 h-full rounded-full"
            />
          </div>
          <div className="text-xs text-gray-500 font-semibold mt-2">
            Driven by Eco Packaging adoption
          </div>
        </div>

      </div>
    </div>
  );
};
