import React from 'react';
import { Product } from '../../types';
import { EcoScoreBadge } from './EcoScoreBadge';
import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, Scale } from 'lucide-react';
import { GreenSellerBadge } from './GreenSellerBadge';

interface ExtendedProduct extends Product {
  carbonSavingsKg?: number;
  sellerBadge?: string | null;
  isLocal?: boolean;
  distanceKm?: number;
}

interface ProductCardProps {
  product: ExtendedProduct;
  onAddToCart?: (product: Product) => void;
  onCompare?: (product: ExtendedProduct) => void;
  isCompareActive?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onCompare, isCompareActive }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer group"
    >
      {/* Image Area */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out" />
        ) : (
          <span className="text-gray-400 font-medium text-sm">No Image Available</span>
        )}
        
        {/* Gradient Overlay for Top Badges */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent z-0"></div>
        
        {/* Absolute Eco Badge */}
        <div className="absolute top-3 left-3 z-10 shadow-sm rounded-full overflow-hidden">
          <EcoScoreBadge score={product.ecoScore} />
        </div>

        {/* Absolute Compare Button on Hover */}
        {onCompare && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); onCompare(product); }}
              className={`p-2.5 rounded-full shadow-xl transition-all hover:scale-110 ${isCompareActive ? 'bg-amazon-orange text-gray-900' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'}`}
              title="Compare Product"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        <h3 className="font-bold text-gray-900 text-[17px] mb-2 line-clamp-2 leading-snug group-hover:text-eco-primary transition-colors">{product.name}</h3>
        
        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-500 font-medium">
          <span className="truncate">{product.seller}</span>
          {product.sellerBadge && (
            <GreenSellerBadge level={product.sellerBadge as any} className="scale-75 origin-left" />
          )}
        </div>

        {/* Impact Stats */}
        <div className="space-y-1.5 mb-4 mt-1 bg-eco-light/30 p-2.5 rounded-lg border border-eco-light">
          {product.carbonSavingsKg ? (
            <div className="flex items-center text-[13px] text-eco-dark font-bold">
              <Leaf className="w-3.5 h-3.5 mr-1.5 text-eco-primary" /> Saves {product.carbonSavingsKg}kg CO₂
            </div>
          ) : null}
          {product.isLocal && product.distanceKm ? (
            <div className="flex items-center text-[13px] text-blue-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Local Seller ({product.distanceKm}km away)
            </div>
          ) : null}
          {(!product.carbonSavingsKg && !product.isLocal) && (
            <div className="flex items-center text-[13px] text-gray-500 font-medium italic">
              Standard green fulfillment
            </div>
          )}
        </div>
        
        {/* Price and Action row pushes to bottom */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Price</span>
            <span className="text-2xl font-black text-gray-900 leading-none">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart(product);
            }}
            className="bg-amazon-orange hover:bg-amazon-darkOrange text-gray-900 w-11 h-11 rounded-full transition-all flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amazon-orange/30"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 ml-[-2px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
