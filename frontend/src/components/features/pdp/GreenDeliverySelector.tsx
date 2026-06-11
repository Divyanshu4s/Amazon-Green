import React, { useState } from 'react';
import { Truck, Users, Leaf, Gift } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const GreenDeliverySelector: React.FC<{ options: any[] }> = ({ options }) => {
  const [selected, setSelected] = useState(options[0].type);

  const icons: any = {
    'Standard Delivery': <Truck className="w-5 h-5 text-gray-500" />,
    'Green Delivery': <Leaf className="w-5 h-5 text-eco-primary" />,
    'Group Delivery': <Users className="w-5 h-5 text-blue-500" />
  };

  return (
    <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-semibold text-gray-900 flex items-center justify-between">
        <span>Choose Delivery Speed</span>
        <span className="text-xs font-normal text-gray-500 flex items-center">
          <Gift className="w-3 h-3 text-amazon-orange mr-1" /> Earn Sapling Coins
        </span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {options.map((opt) => (
          <label 
            key={opt.type}
            className={cn(
              "flex items-start p-4 cursor-pointer transition-colors hover:bg-gray-50",
              selected === opt.type ? "bg-eco-light/20" : ""
            )}
          >
            <input 
              type="radio" 
              name="delivery" 
              value={opt.type}
              checked={selected === opt.type}
              onChange={() => setSelected(opt.type)}
              className="mt-1 text-amazon-orange focus:ring-amazon-orange"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-900 flex items-center">
                  {icons[opt.type]}
                  <span className="ml-2">{opt.type}</span>
                </span>
                <span className="font-semibold text-gray-900">
                  {opt.cost === 0 ? 'FREE' : `$${opt.cost.toFixed(2)}`}
                </span>
              </div>
              <div className="text-sm text-green-700 font-medium mb-1">{opt.time}</div>
              {opt.description && <div className="text-xs text-gray-500 mb-2">{opt.description}</div>}
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
                  {opt.co2}kg CO₂
                </div>
                {opt.coins > 0 && (
                  <div className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded font-bold border border-yellow-200">
                    +{opt.coins} Coins
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
