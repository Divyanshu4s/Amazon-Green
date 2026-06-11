import React from 'react';

export const GREEN_FEATURES = [
  { id: 'plasticFree', label: 'Plastic Free' },
  { id: 'compostablePackaging', label: 'Compostable Packaging' },
  { id: 'isLocal', label: 'Local Products (<20km)' },
  { id: 'greenDeliveryEligible', label: 'Green Delivery Eligible' },
  { id: 'verifiedSeller', label: 'Verified Green Sellers' }
];

export const CATEGORIES = ['Home', 'Kitchen', 'Fashion', 'Beauty', 'Food'];

export interface FilterSidebarProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedFeatures: string[];
  onToggleFeature: (featureId: string) => void;
  minEcoScore: number;
  onEcoScoreChange: (score: number) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  onToggleCategory,
  selectedFeatures,
  onToggleFeature,
  minEcoScore,
  onEcoScoreChange
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>
      
      {/* Category */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2 text-gray-900">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-amazon-orange transition-colors">
              <input 
                type="checkbox" 
                className="rounded text-amazon-orange focus:ring-amazon-orange w-4 h-4"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sustainability Features */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2 text-gray-900">Green Features</h4>
        <div className="space-y-2">
          {GREEN_FEATURES.map(feature => (
            <label key={feature.id} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:text-eco-primary transition-colors">
              <input 
                type="checkbox" 
                className="rounded text-eco-primary focus:ring-eco-primary w-4 h-4" 
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => onToggleFeature(feature.id)}
              />
              <span>{feature.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* EcoScore Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-sm text-gray-900">Minimum EcoScore</h4>
          <span className="text-sm font-bold text-eco-primary bg-eco-light px-2 py-0.5 rounded-full">{minEcoScore}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={minEcoScore}
          onChange={(e) => onEcoScoreChange(parseInt(e.target.value))}
          className="w-full accent-eco-primary cursor-pointer" 
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
      
    </div>
  );
};
