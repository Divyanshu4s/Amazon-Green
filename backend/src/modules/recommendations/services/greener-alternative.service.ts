import { ContentRecommendationEngine } from './content-recommendation-engine.service';
import { CarbonComparisonService } from './carbon-comparison.service';
import { RecommendationExplanationService } from './recommendation-explanation.service';

export class GreenerAlternativeService {
  /**
   * Recommends a greener alternative for a specific product.
   */
  static async getAlternatives(productId: string) {
    const candidates = await ContentRecommendationEngine.getSimilarProducts(productId, 10);
    
    // We only want products that actually have a HIGHER EcoScore
    // Assuming the base product has some EcoScore, but Content engine sorts by ecoScore DESC
    const alternatives: any[] = [];

    for (const alt of candidates) {
      // Get the exact carbon savings
      const comparison = await CarbonComparisonService.compare(productId, alt._id.toString());
      
      // Only keep if it's genuinely greener (higher score and saves carbon)
      if (comparison.metrics.sustainabilityImprovement > 0) {
        const explanations = RecommendationExplanationService.generateExplanation(alt, false, comparison.metrics.carbonReductionKg);
        
        alternatives.push({
          product: alt,
          comparisonMetrics: comparison.metrics,
          explanations
        });
      }
    }

    return alternatives.slice(0, 5); // Return top 5
  }
}
