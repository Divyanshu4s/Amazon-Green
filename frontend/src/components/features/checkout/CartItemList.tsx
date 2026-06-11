import React from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { EcoScoreBadge } from '../EcoScoreBadge';
import { Leaf, Trash2 } from 'lucide-react';

export const CartItemList: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return <div className="p-6 bg-white border border-gray-200 rounded-lg text-center text-gray-500">Your EcoCart is empty.</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Review Your Order</h2>
      
      <div className="space-y-6">
        {items.map(item => (
          <div key={item.product.id} className="flex flex-col md:flex-row gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded border" />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 line-clamp-2 pr-4">{item.product.name}</h3>
                <span className="font-bold text-lg">${item.product.price.toFixed(2)}</span>
              </div>
              
              <div className="text-sm text-gray-500 mt-1 mb-2">Sold by: <span className="text-amazon-orange">{item.product.seller}</span></div>
              
              <div className="flex items-center space-x-4 mb-4">
                <EcoScoreBadge score={item.product.ecoScore} />
                {item.product.carbonSavingsKg > 0 && (
                  <div className="flex items-center text-xs text-eco-primary font-bold bg-eco-light/30 px-2 py-1 rounded">
                    <Leaf className="w-3 h-3 mr-1" /> Saves {item.product.carbonSavingsKg}kg CO₂
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <select 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50 focus:ring-amazon-orange"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
                </select>
                <button 
                  onClick={() => removeItem(item.product.id)}
                  className="text-sm text-gray-400 hover:text-red-500 flex items-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
