import React from 'react';
import { HeroSection } from '../components/features/HeroSection';
import { ClimatePledgeStats } from '../components/features/ClimatePledgeStats';
import { ProductCarousel } from '../components/features/ProductCarousel';
import { mockProducts } from '../utils/mockData';
import { useCartStore } from '../store/useCartStore';

export const Home: React.FC = () => {
  const { addItem } = useCartStore();

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    // Here we'd normally trigger a toast
  };

  const handleCompare = (product: any) => {
    console.log("Compare", product.name);
  };

  // Filter mocked products for different sections
  const recommendedProducts = mockProducts.filter(p => p.ecoScore > 80);
  const localProducts = mockProducts.filter(p => p.isLocal);

  return (
    <div className="pb-12">
      <HeroSection />
      
      <ClimatePledgeStats />

      <ProductCarousel 
        title="Recommended For You" 
        subtitle="Based on your eco-preferences and past purchases."
        products={recommendedProducts}
        linkTo="/products"
        onAddToCart={handleAddToCart}
        onCompare={handleCompare}
      />

      <div className="bg-eco-light/30 -mx-4 px-4 py-12 mb-12 md:mx-[-calc(50vw-50%)] md:px-[calc(50vw-50%)]">
        <ProductCarousel 
          title="Near You" 
          subtitle="Support local green sellers and reduce delivery emissions."
          products={localProducts}
          linkTo="/products?local=true"
          onAddToCart={handleAddToCart}
          onCompare={handleCompare}
        />
      </div>

      <ProductCarousel 
        title="Trending Sustainable Swaps" 
        products={mockProducts}
        linkTo="/products"
        onAddToCart={handleAddToCart}
        onCompare={handleCompare}
      />
    </div>
  );
};
