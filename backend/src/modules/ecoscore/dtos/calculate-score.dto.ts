export interface CalculateEcoScoreDto {
  // Material factors
  materialType: string;
  recycledContentPercentage: number;
  renewableSource: boolean;
  recyclability: boolean;

  // User Impact factors
  energySaving: boolean;
  waterSaving: boolean;
  reusable: boolean;
  refillable: boolean;
  wasteReduction: boolean;
  repairable: boolean;

  // Durability factors
  lifespanYears: number;
  warrantyYears: number;
  reuseCycles: number;

  // Packaging factors
  packagingMaterial: string;
  packagingRecyclable: boolean;
  plasticPercentage: number;
  packagingEfficiency: number; // 0 to 100%

  // Locality factors
  sellerLocation: { lat: number; lng: number };
  customerLocation: { lat: number; lng: number };
  warehouseLocation?: { lat: number; lng: number };

  // Rule tags (e.g., ["single_use_plastic", "recycled_content_70_plus"])
  tags: string[];
}
