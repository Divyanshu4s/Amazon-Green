import PackagingMaterial, { PackagingTypeEnum } from '../../../models/PackagingMaterial';

export class PackagingEcoScoreService {
  /**
   * Generates a 0-100 EcoScore for a specific packaging configuration.
   */
  static async calculatePackagingEcoScore(materialId: string, volumeEfficiencyPercent: number) {
    const material = await PackagingMaterial.findById(materialId);
    if (!material) return 0;

    let score = 0;

    // Base score by material type (Max 40 points)
    if (material.materialType === PackagingTypeEnum.COMPOSTABLE) score += 40;
    else if (material.materialType === PackagingTypeEnum.MINIMAL) score += 35;
    else if (material.materialType === PackagingTypeEnum.RECYCLED) score += 30;
    else if (material.materialType === PackagingTypeEnum.ECO) score += 20;
    else score += 5; // Standard

    // Recyclability (Max 20 points)
    if (material.recyclable) score += 20;

    // Plastic Reduction (Max 20 points)
    // 0% plastic gets 20 points, 100% plastic gets 0 points
    const plasticPenalty = (material.plasticPercentage / 100) * 20;
    score += (20 - plasticPenalty);

    // Volume Efficiency (Max 20 points)
    // 100% packing efficiency gets 20 points, 50% gets 10 points
    score += (volumeEfficiencyPercent / 100) * 20;

    return Math.min(100, Math.round(score));
  }
}
