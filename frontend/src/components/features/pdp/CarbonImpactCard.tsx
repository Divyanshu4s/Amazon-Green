import React from 'react';
import { Wind, Recycle, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';

export const CarbonImpactCard: React.FC<{ savingsKg: number }> = ({ savingsKg }) => {
  // Mock conventional vs this product logic
  const conventional = savingsKg * 2.5; 
  const thisProduct = conventional - savingsKg;

  const maxVal = Math.max(conventional, thisProduct);
  const conventionalWidth = (conventional / maxVal) * 100;
  const thisProductWidth = (thisProduct / maxVal) * 100;

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm mt-6">
      <h3 className="font-bold text-gray-900 text-lg mb-6">Carbon Impact Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Bar Comparison */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-4">Estimated CO₂ Emissions</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Conventional Alternative</span>
                <span className="text-gray-500">{conventional.toFixed(1)}kg</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${conventionalWidth}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gray-400 h-3 rounded-full"
                ></motion.div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-eco-dark">This Product</span>
                <span className="font-bold text-eco-dark">{thisProduct.toFixed(1)}kg</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${thisProductWidth}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="bg-eco-primary h-3 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Equivalencies */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <Wind className="w-6 h-6 text-blue-500 mb-2" />
            <span className="text-xl font-black text-gray-900">{savingsKg.toFixed(1)}kg</span>
            <span className="text-xs text-gray-500">CO₂ Prevented</span>
          </div>
          <div className="bg-green-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <TreePine className="w-6 h-6 text-eco-primary mb-2" />
            <span className="text-xl font-black text-gray-900">{(savingsKg * 0.15).toFixed(1)}</span>
            <span className="text-xs text-gray-500">Trees Equivalent</span>
          </div>
        </div>

      </div>
    </div>
  );
};
