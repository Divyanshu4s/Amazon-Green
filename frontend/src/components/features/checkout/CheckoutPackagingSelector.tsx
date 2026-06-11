import React from 'react';
import { Package, Leaf, Gift, CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Props {
  options: any[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CheckoutPackagingSelector: React.FC<Props> = ({ options, selectedId, onSelect }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">3. Packaging Preference</h2>
      
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <label 
              key={opt.id}
              className={cn(
                "flex items-start p-4 border rounded-lg cursor-pointer transition-colors hover:shadow-sm",
                isSelected ? "border-eco-primary bg-eco-light/10 ring-1 ring-eco-primary" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <input 
                type="radio" 
                name="packaging_chk" 
                value={opt.id}
                checked={isSelected}
                onChange={() => onSelect(opt.id)}
                className="mt-1 w-4 h-4 text-eco-primary focus:ring-eco-primary border-gray-300"
              />
              <div className="ml-4 flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900 text-base">{opt.type}</span>
                    {opt.recommended && (
                      <span className="ml-3 text-[10px] uppercase font-bold tracking-wider text-white bg-eco-primary px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900 mt-1 md:mt-0">
                    {opt.cost === 0 ? 'FREE' : `+$${opt.cost.toFixed(2)}`}
                  </span>
                </div>
                
                {opt.description && <p className="text-sm text-gray-500 mb-2">{opt.description}</p>}
                
                <div className="flex flex-wrap gap-3 mt-2">
                  {opt.wasteSaved > 0 && (
                    <div className="flex items-center text-xs text-eco-dark bg-eco-light/50 px-2 py-1 rounded font-medium">
                      <Leaf className="w-3 h-3 mr-1" /> Saves {opt.wasteSaved}kg Waste
                    </div>
                  )}
                  {opt.coins > 0 && (
                    <div className="flex items-center text-xs text-yellow-800 bg-yellow-50 px-2 py-1 rounded font-bold border border-yellow-200">
                      <Gift className="w-3 h-3 mr-1" /> +{opt.coins} Coins
                    </div>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
