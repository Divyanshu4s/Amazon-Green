export class CarbonCalculationService {
  /**
   * Core algorithm for determining carbon savings of a specific transaction versus a theoretical baseline.
   * Values are estimates in kg of CO2 equivalent.
   */
  static calculateOrderSavings(params: {
    baseCarbonEstimate: number; // e.g. 10kg for standard order
    isSustainableProduct: boolean;
    isLocalProduct: boolean;
    isSustainableDelivery: boolean;
    isGroupDelivery: boolean;
    isPackagingOptimized: boolean;
  }) {
    let actualCarbon = params.baseCarbonEstimate;

    // Reductions applied dynamically
    if (params.isSustainableProduct) actualCarbon *= 0.6; // 40% reduction
    if (params.isLocalProduct) actualCarbon *= 0.7; // 30% reduction on transit
    if (params.isSustainableDelivery) actualCarbon *= 0.8; // 20% reduction (EV)
    if (params.isGroupDelivery) actualCarbon *= 0.85; // 15% reduction
    if (params.isPackagingOptimized) actualCarbon *= 0.95; // 5% reduction

    const saved = params.baseCarbonEstimate - actualCarbon;
    const percentage = (saved / params.baseCarbonEstimate) * 100;

    return {
      baselineCarbonKg: Number(params.baseCarbonEstimate.toFixed(2)),
      actualCarbonKg: Number(actualCarbon.toFixed(2)),
      carbonSavedKg: Number(saved.toFixed(2)),
      savingsPercentage: Number(percentage.toFixed(2)),
    };
  }
}
