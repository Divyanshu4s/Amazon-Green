import Product from '../../../models/Product';

export class CarbonComparisonService {
  /**
   * Compares the carbon footprint and sustainability of two products.
   * Useful when showing a "Greener Alternative".
   */
  static async compare(baseProductId: string, altProductId: string) {
    const baseProduct = await Product.findById(baseProductId);
    const altProduct = await Product.findById(altProductId);

    if (!baseProduct || !altProduct) throw new Error('Products not found');

    // Simulate Carbon footprint calculations (would be fetched from DB/ML in reality)
    // Heuristic: Higher ecoScore = lower carbon footprint roughly
    const baseCarbonKg = 10 - (baseProduct.ecoScore / 10); 
    const altCarbonKg = 10 - (altProduct.ecoScore / 10);
    
    const carbonReduction = Math.max(0, baseCarbonKg - altCarbonKg);
    const sustainabilityImprovement = altProduct.ecoScore - baseProduct.ecoScore;

    return {
      baseProduct: { id: baseProduct._id, ecoScore: baseProduct.ecoScore },
      altProduct: { id: altProduct._id, ecoScore: altProduct.ecoScore },
      metrics: {
        carbonReductionKg: Number(carbonReduction.toFixed(2)),
        sustainabilityImprovement: Number(sustainabilityImprovement.toFixed(2)),
        packagingReductionPercent: altProduct.metadata.recycledContentPercentage < baseProduct.metadata.recycledContentPercentage ? 
          (baseProduct.metadata.recycledContentPercentage - altProduct.metadata.recycledContentPercentage) : 0
      }
    };
  }
}
