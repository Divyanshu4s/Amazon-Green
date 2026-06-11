import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale } from 'lucide-react';
import { EcoScoreBadge } from './EcoScoreBadge';

interface ComparisonDrawerProps {
  products: any[];
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({ products, onRemove, onClose }) => {
  if (products.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 z-50 p-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <Scale className="w-5 h-5 mr-2 text-amazon-orange" />
              Compare Products ({products.length}/3)
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {products.map(product => (
              <div key={product.id} className="w-64 border rounded p-3 relative flex-shrink-0 bg-gray-50">
                <button 
                  onClick={() => onRemove(product.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-sm font-semibold truncate mb-2">{product.name}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-500">Price</div>
                  <div className="font-bold text-right">${product.price.toFixed(2)}</div>
                  <div className="text-gray-500">EcoScore</div>
                  <div className="text-right"><EcoScoreBadge score={product.ecoScore} /></div>
                  <div className="text-gray-500">Carbon Saved</div>
                  <div className="text-right font-medium text-eco-primary">{product.carbonSavingsKg || 0}kg</div>
                  <div className="text-gray-500">Material</div>
                  <div className="text-right truncate">{product.materialType || 'N/A'}</div>
                </div>
              </div>
            ))}
            
            {products.length < 3 && (
              <div className="w-64 border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-400 p-4">
                <Scale className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm text-center">Add another product to compare</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
