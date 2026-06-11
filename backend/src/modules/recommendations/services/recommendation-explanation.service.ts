export class RecommendationExplanationService {
  /**
   * Generates human-readable, transparent explanations for why a product was recommended.
   */
  static generateExplanation(product: any, isLocal: boolean, carbonReductionKg?: number) {
    const explanations: string[] = [];

    if (product.ecoScore >= 85) {
      explanations.push(`Recommended because it has a high EcoScore of ${product.ecoScore}.`);
    }

    if (isLocal && carbonReductionKg) {
      explanations.push(`Buying locally saves approximately ${carbonReductionKg}kg CO₂.`);
    }

    if (product.plasticPercentage < 5) {
      explanations.push("Uses nearly plastic-free sustainable packaging.");
    }

    // Default fallback
    if (explanations.length === 0) {
      explanations.push("Popular among eco-conscious shoppers.");
    }

    return explanations;
  }
}
