import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import { ProductDetailsSkeleton } from '../components/features/pdp/ProductDetailsSkeleton';
import { ImageGallery } from '../components/features/pdp/ImageGallery';
import { ProductCoreInfo } from '../components/features/pdp/ProductCoreInfo';
import { BuyBox } from '../components/features/pdp/BuyBox';
import { EcoScoreHeroCard } from '../components/features/pdp/EcoScoreHeroCard';
import { EcoScoreBreakdown } from '../components/features/pdp/EcoScoreBreakdown';
import { CarbonImpactCard } from '../components/features/pdp/CarbonImpactCard';
import { MLAuditSection } from '../components/features/pdp/MLAuditSection';
import { SellerSustainabilityCard } from '../components/features/pdp/SellerSustainabilityCard';
import { GreenDeliverySelector } from '../components/features/pdp/GreenDeliverySelector';
import { SmartPackagingSelector } from '../components/features/pdp/SmartPackagingSelector';
import { useCartStore } from '../store/useCartStore';
import { mockSellers } from '../utils/mockData';
import { ProductCarousel } from '../components/features/ProductCarousel';
import { mockProducts } from '../utils/mockData';
import { ChevronRight } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProductDetails(id);
  const { addItem } = useCartStore();

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !product) return <div className="p-8 text-center text-red-500 font-bold text-xl">Product Not Found or API Error</div>;

  const sellerInfo = mockSellers.find(s => s.name === product.seller);

  const handleAddToCart = (quantity: number) => {
    addItem(product as any, quantity);
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  return (
    <div className="pb-16 font-sans">
      
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <Link to="/" className="hover:underline">Home</Link> <ChevronRight className="w-4 h-4 mx-1" />
        <Link to="/products" className="hover:underline">{product.category}</Link> <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* TOP FOLD: Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Gallery */}
        <div className="lg:col-span-5">
          <ImageGallery images={product.images} />
        </div>

        {/* Info */}
        <div className="lg:col-span-4">
          <ProductCoreInfo product={product} sellerInfo={sellerInfo} />
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-3">
          <BuyBox product={product} onAddToCart={handleAddToCart} />
          {product.deliveryOptions && <GreenDeliverySelector options={product.deliveryOptions} />}
          {product.packagingOptions && <SmartPackagingSelector options={product.packagingOptions} />}
        </div>
      </div>

      {/* SECTION 2: Deep Sustainability Analytics */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-6 border-b border-gray-200 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">Sustainability Intelligence</h2>
          <span className="bg-eco-light text-eco-dark text-xs font-bold px-2 py-1 rounded">Powered by EcoCart AI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <EcoScoreHeroCard score={product.ecoScore} grade={product.ecoGrade} confidence={product.confidence} />
          {product.scoreBreakdown && <EcoScoreBreakdown data={product.scoreBreakdown} />}
        </div>

        {product.carbonSavingsKg && <CarbonImpactCard savingsKg={product.carbonSavingsKg} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {product.mlAudit && <MLAuditSection audit={product.mlAudit} />}
          {product.seller && <SellerSustainabilityCard sellerName={product.seller} />}
        </div>
      </div>

      {/* SECTION 3: Discovery */}
      <div className="border-t border-gray-200 pt-12">
        <ProductCarousel 
          title="Greener Alternatives" 
          subtitle="Products in this category with higher EcoScores."
          products={mockProducts.filter(p => p.ecoScore > product.ecoScore)}
          linkTo="/products"
          onAddToCart={() => {}}
          onCompare={() => {}}
        />
      </div>

    </div>
  );
};
