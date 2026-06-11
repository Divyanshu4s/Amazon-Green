import React from 'react';
import { ArrowRight, Leaf, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  currentDelivery: any;
  currentPackaging: any;
  bestDelivery: any;
  bestPackaging: any;
}

export const SustainabilityComparisonPanel: React.FC<Props> = ({ currentDelivery, currentPackaging, bestDelivery, bestPackaging }) => {
  if (!currentDelivery || !currentPackaging || !bestDelivery || !bestPackaging) return null;

  const currentCO2 = currentDelivery.co2;
  const bestCO2 = bestDelivery.co2;
  const diffCO2 = currentCO2 - bestCO2;

  const currentWaste = currentPackaging.wasteSaved || 0;
  const bestWaste = bestPackaging.wasteSaved || 0;
  const diffWaste = bestWaste - currentWaste;

  const isOptimal = diffCO2 <= 0 && diffWaste <= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
        Sustainability Check <Leaf className="w-5 h-5 text-eco-primary ml-2" />
      </h3>

      <AnimatePresence mode="wait">
        {isOptimal ? (
          <motion.div 
            key="optimal"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start"
          >
            <div className="text-3xl mr-3">🌍</div>
            <div>
              <h4 className="font-bold text-green-900">Optimal Choices Made!</h4>
              <p className="text-sm text-green-800 mt-1">You've selected the most sustainable delivery and packaging options available for this order.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="suboptimal"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4"
          >
            <div className="flex items-start mb-3">
              <ShieldAlert className="w-5 h-5 text-amazon-orange mr-2 mt-0.5" />
              <div>
                <h4 className="font-bold text-orange-900">You can still reduce your impact</h4>
                <p className="text-sm text-orange-800 mt-1">Switching to the recommended options will save:</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pl-7 mt-2">
              {diffCO2 > 0 && (
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-amazon-orange mr-2"></span>
                  An additional {diffCO2.toFixed(1)}kg of CO₂ emissions
                </div>
              )}
              {diffWaste > 0 && (
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-amazon-orange mr-2"></span>
                  An additional {diffWaste.toFixed(1)}kg of packaging waste
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
