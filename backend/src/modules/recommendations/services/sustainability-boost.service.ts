export class SustainabilityBoostService {
  /**
   * Applies the "Sustainability Boost" factor to a recommendation score.
   */
  static applyBoost(product: any, seller: any) {
    let boostMultiplier = 1.0;

    // 1. Core EcoScore Boost
    if (product.ecoScore >= 90) boostMultiplier += 0.25;
    else if (product.ecoScore >= 75) boostMultiplier += 0.15;

    // 2. Packaging Sustainability
    if (product.plasticPercentage < 10) boostMultiplier += 0.10;

    // 3. Seller Sustainability Score (Halo effect)
    if (seller && seller.sustainabilityScore >= 80) boostMultiplier += 0.05;

    return boostMultiplier;
  }
}
