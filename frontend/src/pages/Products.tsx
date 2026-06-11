import React, { useState, useMemo } from 'react';
import { FilterSidebar, GREEN_FEATURES } from '../components/features/FilterSidebar';
import { ProductCard } from '../components/features/ProductCard';
import { ComparisonDrawer } from '../components/features/ComparisonDrawer';
import { mockProducts } from '../utils/mockData';
import { useCartStore } from '../store/useCartStore';

export const Products: React.FC = () => {
  const { addItem } = useCartStore();
  const [compareList, setCompareList] = useState<any[]>([]);

  // Filter & Sort State
  const [sortBy, setSortBy] = useState('Highest EcoScore');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minEcoScore, setMinEcoScore] = useState<number>(0);

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
  };

  const handleCompare = (product: any) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, product]);
      } else {
        alert("You can only compare up to 3 products at a time.");
      }
    }
  };

  // Handlers for Filtering
  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleToggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) ? prev.filter(f => f !== featureId) : [...prev, featureId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setMinEcoScore(0);
  };

  // Core Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // 1. Filter by Category (OR logic across selected categories)
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 2. Filter by Green Features (AND logic - must have ALL selected features)
    if (selectedFeatures.length > 0) {
      result = result.filter(p => {
        return selectedFeatures.every(feature => {
          return (p as any)[feature] === true;
        });
      });
    }

    // 3. Filter by Minimum EcoScore
    if (minEcoScore > 0) {
      result = result.filter(p => p.ecoScore >= minEcoScore);
    }

    // 4. Sort Result
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Highest EcoScore':
          return b.ecoScore - a.ecoScore;
        case 'Lowest EcoScore':
          return a.ecoScore - b.ecoScore;
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Most Popular': // Mock fallback
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategories, selectedFeatures, minEcoScore, sortBy]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <FilterSidebar 
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            selectedFeatures={selectedFeatures}
            onToggleFeature={handleToggleFeature}
            minEcoScore={minEcoScore}
            onEcoScoreChange={setMinEcoScore}
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing <span className="font-bold">{filteredProducts.length}</span> sustainable results
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-gray-300 rounded-md focus:ring-amazon-orange focus:border-amazon-orange cursor-pointer"
            >
              <option>Highest EcoScore</option>
              <option>Lowest EcoScore</option>
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || selectedFeatures.length > 0 || minEcoScore > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
            
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amazon-orange/10 text-amazon-darkOrange border border-amazon-orange/20">
                {cat}
                <button onClick={() => handleToggleCategory(cat)} className="ml-2 hover:text-red-500 transition-colors">&times;</button>
              </span>
            ))}
            
            {selectedFeatures.map(feat => {
              const label = GREEN_FEATURES.find(f => f.id === feat)?.label;
              return (
                <span key={feat} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-eco-light text-eco-dark border border-eco-primary/20">
                  {label}
                  <button onClick={() => handleToggleFeature(feat)} className="ml-2 hover:text-red-500 transition-colors">&times;</button>
                </span>
              )
            })}
            
            {minEcoScore > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                EcoScore &ge; {minEcoScore}
                <button onClick={() => setMinEcoScore(0)} className="ml-2 hover:text-red-500 transition-colors">&times;</button>
              </span>
            )}
            
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-900 underline ml-2 transition-colors">Clear all</button>
          </div>
        )}

        {/* Product Grid / Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sustainable products match your filters.</h3>
            <p className="text-gray-500 mb-6">Try reducing your Minimum EcoScore requirements or removing some filters.</p>
            <button 
              onClick={clearFilters} 
              className="px-6 py-2.5 bg-eco-primary text-white font-medium rounded-md hover:bg-eco-dark transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onCompare={handleCompare}
                isCompareActive={!!compareList.find(p => p.id === product.id)}
              />
            ))}
          </div>
        )}

      </div>

      <ComparisonDrawer 
        products={compareList} 
        onRemove={(id) => setCompareList(compareList.filter(p => p.id !== id))}
        onClose={() => setCompareList([])}
      />
    </div>
  );
};
