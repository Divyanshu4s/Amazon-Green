import React from 'react';
import { Gift } from 'lucide-react';

interface Props {
  subtotal: number;
  shipping: number;
  packagingCost: number;
  tax: number;
  totalCoinsEarned: number;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

export const OrderSummaryBox: React.FC<Props> = ({ 
  subtotal, shipping, packagingCost, tax, totalCoinsEarned, onPlaceOrder, isPlacingOrder 
}) => {
  const total = subtotal + shipping + packagingCost + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
      <button 
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        className="w-full bg-amazon-orange hover:bg-amazon-darkOrange disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-4 rounded-lg shadow-sm transition-colors mb-4"
      >
        {isPlacingOrder ? 'Processing...' : 'Place your order'}
      </button>

      <div className="text-xs text-gray-500 text-center mb-6">
        By placing your order, you agree to EcoCart's privacy notice and conditions of use.
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-4 border-b pb-2">Order Summary</h3>

      <div className="space-y-2 text-sm text-gray-700 mb-4 border-b pb-4">
        <div className="flex justify-between">
          <span>Items:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping & handling:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        {packagingCost > 0 && (
          <div className="flex justify-between">
            <span>Eco Packaging:</span>
            <span>${packagingCost.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Estimated tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-xl text-red-700">Order total:</span>
        <span className="font-bold text-xl text-red-700">${total.toFixed(2)}</span>
      </div>

      {/* Rewards Preview */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-yellow-900 text-sm flex items-center">
            <Gift className="w-4 h-4 mr-1 text-amazon-orange" /> Rewards Earned
          </div>
          <div className="text-xs text-yellow-800 mt-1">To be added to your wallet</div>
        </div>
        <div className="text-2xl font-black text-amazon-orange">+{totalCoinsEarned}</div>
      </div>
    </div>
  );
};
