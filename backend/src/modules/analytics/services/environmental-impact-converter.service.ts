export class EnvironmentalImpactConverter {
  // Common conversion metrics based on EPA estimates
  private static readonly CO2_PER_TREE_YEAR_KG = 21.77; 
  private static readonly CO2_PER_MILE_DRIVEN_KG = 0.404;
  private static readonly PLASTIC_BOTTLE_WEIGHT_KG = 0.009;

  /**
   * Converts hard kg metrics into relatable human concepts.
   */
  static convert(carbonSavedKg: number, plasticSavedKg: number) {
    return {
      treesEquivalent: Number((carbonSavedKg / this.CO2_PER_TREE_YEAR_KG).toFixed(2)),
      milesNotDriven: Number((carbonSavedKg / this.CO2_PER_MILE_DRIVEN_KG).toFixed(2)),
      plasticBottlesAvoided: Math.round(plasticSavedKg / this.PLASTIC_BOTTLE_WEIGHT_KG),
      smartphonesCharged: Math.round(carbonSavedKg * 121), // Roughly 121 charges per kg CO2
    };
  }
}
