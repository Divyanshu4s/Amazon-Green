import React from 'react';
import { TreePine, Wind, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  totalItemSavings: number;
  deliveryCO2: number;
  packagingWasteSaved: number;
}

export const CarbonImpactVisualizer: React.FC<Props> = ({ totalItemSavings, deliveryCO2, packagingWasteSaved }) => {
  // Rough estimations for gamification display
  const netSavings = totalItemSavings + (2.5 - deliveryCO2); // Assuming 2.5 is baseline
  const treesEq = (netSavings * 0.15).toFixed(1);

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 mb-6 overflow-hidden relative shadow-lg">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <LeafPattern />
      </div>

      <h3 className="font-bold text-lg mb-6 flex items-center relative z-10">
        Your Order's Green Impact
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {/* Metric 1 */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col">
          <Wind className="w-6 h-6 text-eco-primary mb-2" />
          <span className="text-3xl font-black">{Math.max(0, netSavings).toFixed(1)}<span className="text-lg">kg</span></span>
          <span className="text-xs text-gray-400 font-medium tracking-wide mt-1 uppercase">Net CO₂ Saved</span>
        </motion.div>

        {/* Metric 2 */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col">
          <Recycle className="w-6 h-6 text-blue-400 mb-2" />
          <span className="text-3xl font-black">{packagingWasteSaved.toFixed(1)}<span className="text-lg">kg</span></span>
          <span className="text-xs text-gray-400 font-medium tracking-wide mt-1 uppercase">Waste Prevented</span>
        </motion.div>

        {/* Metric 3 */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col col-span-2 md:col-span-1">
          <TreePine className="w-6 h-6 text-green-400 mb-2" />
          <span className="text-3xl font-black">{treesEq}</span>
          <span className="text-xs text-gray-400 font-medium tracking-wide mt-1 uppercase">Trees Equivalent</span>
        </motion.div>
      </div>
    </div>
  );
};

const LeafPattern = () => (
  <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
  </svg>
);
