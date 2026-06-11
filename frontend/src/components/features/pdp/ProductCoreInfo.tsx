import React from 'react';
import { Leaf } from 'lucide-react';
import { GreenSellerBadge } from '../GreenSellerBadge';

interface ProductCoreInfoProps {
  product: any;
  sellerInfo: any;
}

export const ProductCoreInfo: React.FC<ProductCoreInfoProps> = ({ product, sellerInfo }) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Title & Brand */}
      <div>
        <div className="text-sm text-amazon-orange font-semibold tracking-wide hover:underline cursor-pointer mb-1">
          Visit the {product.seller} Store
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {product.name}
        </h1>
        
        {/* Seller Trust Banner */}
        {sellerInfo && (
          <div className="flex items-center space-x-3 mt-3 pb-4 border-b border-gray-200">
            <GreenSellerBadge level={sellerInfo.badge} />
            <span className="text-sm text-gray-500">Verified Green Seller</span>
          </div>
        )}
      </div>

      {/* AI Explanations */}
      {product.aiExplanations && product.aiExplanations.length > 0 && (
        <div className="bg-eco-light/50 border border-eco-light rounded-lg p-4">
          <div className="flex items-center space-x-2 text-eco-dark font-bold mb-3">
            <Leaf className="w-5 h-5" />
            <span>Why is this sustainable?</span>
          </div>
          <ul className="space-y-2">
            {product.aiExplanations.map((explanation: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <span className="text-eco-primary mr-2">•</span>
                <span className="text-sm text-gray-800">{explanation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Product Specifications</h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          {Object.entries(product.specifications || {}).map(([key, value]) => (
            <React.Fragment key={key}>
              <div className="font-medium text-gray-500">{key}</div>
              <div className="text-gray-900">{value as string}</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>

    </div>
  );
};
