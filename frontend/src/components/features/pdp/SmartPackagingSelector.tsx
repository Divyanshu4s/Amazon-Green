import React, { useState } from 'react';
import { Package, Leaf, Gift } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const SmartPackagingSelector: React.FC<{ options: any[] }> = ({ options }) => {
  const [selected, setSelected] = useState(options[0].type);

  const icons: any = {
    'Standard Packaging': <Package className="w-5 h-5 text-gray-500" />,
    'Minimal Packaging': <Leaf className="w-5 h-5 text-eco-secondary" />,
    'Eco Packaging': <Leaf className="w-5 h-5 text-eco-primary" />
  };

  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">
        Packaging Preference
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
              name="packaging" 
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
                  {opt.cost === 0 ? 'FREE' : `+$${opt.cost.toFixed(2)}`}
                </span>
              </div>
              {opt.description && <div className="text-xs text-gray-500 mb-2">{opt.description}</div>}
              
              <div className="flex items-center space-x-4 mt-2">
                {opt.wasteSaved > 0 && (
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
                    -{opt.wasteSaved}kg Waste
                  </div>
                )}
                {opt.coins > 0 && (
                  <div className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded font-bold border border-yellow-200 flex items-center">
                    <Gift className="w-3 h-3 mr-1" />+{opt.coins} Coins
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
