import React, { useRef, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: any[];
  linkTo?: string;
  onAddToCart?: (product: any) => void;
  onCompare?: (product: any) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, products, linkTo, onAddToCart, onCompare }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Roughly one card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-16 mt-8 relative">
      <div className="flex items-end justify-between mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-2 font-medium text-lg">{subtitle}</p>}
        </div>
        {linkTo && (
          <Link to={linkTo} className="hidden md:flex text-amazon-orange hover:text-amazon-darkOrange font-bold items-center text-sm uppercase tracking-wider transition-colors hover:bg-amazon-orange/10 px-4 py-2 rounded-lg">
            View All <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        )}
      </div>

      <div className="relative group">
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-xl p-3 rounded-full border border-gray-100 text-gray-800 hover:text-amazon-orange transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide space-x-6 scroll-smooth"
        >
          {products.map(product => (
            <div key={product.id} className="min-w-[280px] w-[280px] snap-start flex-shrink-0 pt-2">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                onCompare={onCompare} 
              />
            </div>
          ))}
        </div>

        {canScrollRight && products.length > 4 && (
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-xl p-3 rounded-full border border-gray-100 text-gray-800 hover:text-amazon-orange transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {linkTo && (
        <div className="mt-4 text-center md:hidden">
          <Link to={linkTo} className="text-amazon-orange hover:text-amazon-darkOrange font-bold inline-flex items-center text-sm uppercase tracking-wider">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
};
