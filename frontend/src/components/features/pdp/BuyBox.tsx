import React, { useState } from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';

interface BuyBoxProps {
  product: any;
  onAddToCart: (quantity: number) => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm sticky top-24">
      {/* Price */}
      <div className="text-3xl font-bold text-gray-900 mb-2">
        ${product.price.toFixed(2)}
      </div>
      
      {/* Availability */}
      <div className="text-green-700 font-bold mb-4">
        {product.availability}
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Quantity:</label>
        <select 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1.5 focus:ring-amazon-orange focus:border-amazon-orange"
        >
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button 
          onClick={() => onAddToCart(quantity)}
          className="w-full bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 font-bold py-2.5 rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
        <button className="w-full bg-amazon-darkOrange hover:bg-[#c77700] text-gray-900 font-bold py-2.5 rounded-full flex items-center justify-center transition-colors shadow-sm">
          Buy Now
        </button>
      </div>

      {/* Carbon Incentive Banner */}
      {product.carbonSavingsKg > 0 && (
        <div className="mt-4 bg-eco-light/30 border border-eco-light rounded p-3 flex items-start space-x-2">
          <Leaf className="w-5 h-5 text-eco-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-800">
            <span className="font-bold text-eco-primary">Green Impact:</span> Buying this item saves ~{product.carbonSavingsKg * quantity}kg of CO₂ vs conventional alternatives.
          </div>
        </div>
      )}
    </div>
  );
};
