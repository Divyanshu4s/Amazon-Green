import PackagingMaterial from '../../../models/PackagingMaterial';

export class PackagingCarbonService {
  /**
   * Calculates the carbon emissions associated with the physical packaging box.
   */
  static calculateEmissions(materialCarbonFactor: number, boxWeightKg: number) {
    // Emissions = carbon factor (kg CO2 per kg material) * box weight
    return materialCarbonFactor * boxWeightKg;
  }

  /**
   * Estimates the physical weight of the cardboard/material itself based on the box volume.
   * Very rough heuristic.
   */
  static estimateBoxWeightKg(volumeCm3: number) {
    // Assuming 0.0001 kg per cm3 for standard corrugated cardboard
    return volumeCm3 * 0.0001;
  }
}
