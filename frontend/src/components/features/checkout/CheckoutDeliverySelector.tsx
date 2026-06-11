import React from 'react';
import { Truck, Leaf, Users, Gift, CheckCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Props {
  options: any[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CheckoutDeliverySelector: React.FC<Props> = ({ options, selectedId, onSelect }) => {
  const getIcon = (type: string) => {
    if (type.includes('Green')) return <Leaf className="w-6 h-6 text-eco-primary" />;
    if (type.includes('Group')) return <Users className="w-6 h-6 text-blue-500" />;
    return <Truck className="w-6 h-6 text-gray-400" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">2. Choose Delivery Speed</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div 
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "relative border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md",
                isSelected ? "border-eco-primary bg-eco-light/10" : "border-gray-200 hover:border-gray-300",
                opt.recommended ? "ring-2 ring-amazon-orange ring-offset-2" : ""
              )}
            >
              {opt.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amazon-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Recommended
                </div>
              )}
              {isSelected && <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-eco-primary" />}
              
              <div className="mb-3">{getIcon(opt.type)}</div>
              <h3 className="font-bold text-gray-900 mb-1">{opt.type}</h3>
              <p className="text-xs text-gray-500 mb-3 h-8">{opt.description || 'Standard logistics network.'}</p>
              
              <div className="font-semibold text-gray-900 mb-1">{opt.cost === 0 ? 'FREE' : `$${opt.cost.toFixed(2)}`}</div>
              <div className="text-sm text-green-700 font-medium mb-4">{opt.time}</div>

              <div className="space-y-2 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Est. Emissions</span>
                  <span className="font-bold text-gray-700">{opt.co2}kg CO₂</span>
                </div>
                {opt.coins > 0 && (
                  <div className="flex justify-between text-xs bg-yellow-50 text-yellow-800 p-1.5 rounded font-bold border border-yellow-200">
                    <span className="flex items-center"><Gift className="w-3 h-3 mr-1" /> Reward</span>
                    <span>+{opt.coins} Coins</span>
                  </div>
                )}
                {opt.participants && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-1.5 rounded font-bold text-center border border-blue-100">
                    {opt.participants} Neighbors Waiting
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
