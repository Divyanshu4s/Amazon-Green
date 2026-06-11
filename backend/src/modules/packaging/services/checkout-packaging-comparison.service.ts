import { PackagingOptimizationService } from './packaging-optimization.service';
import { PackagingEcoScoreService } from './packaging-eco-score.service';
import { CartProduct } from './order-packaging-optimizer.service';
import { PackagingTypeEnum } from '../../../models/PackagingMaterial';
import PackagingMaterial from '../../../models/PackagingMaterial';

export class CheckoutPackagingComparisonService {
  /**
   * Generates a comparison payload for the checkout screen between Standard and Eco options.
   */
  static async compareOptions(products: CartProduct[]) {
    // 1. Optimize for Standard
    const standardResult = await PackagingOptimizationService.optimize(products, PackagingTypeEnum.STANDARD);
    const standardMaterial = await PackagingMaterial.findOne({ materialType: PackagingTypeEnum.STANDARD });
    const standardEcoScore = await PackagingEcoScoreService.calculatePackagingEcoScore(standardMaterial!._id.toString(), standardResult.utilization);

    // 2. Optimize for Eco
    const ecoResult = await PackagingOptimizationService.optimize(products, PackagingTypeEnum.ECO);
    const ecoMaterial = await PackagingMaterial.findOne({ materialType: PackagingTypeEnum.ECO });
    const ecoEcoScore = await PackagingEcoScoreService.calculatePackagingEcoScore(ecoMaterial!._id.toString(), ecoResult.utilization);

    // 3. Compare
    const carbonSaved = standardResult.carbonGeneratedKg - ecoResult.carbonGeneratedKg;
    // For simplicity, we define "Material Saved" here as physical waste reduction % diff, and plastic difference
    const plasticSavedPercent = (standardMaterial?.plasticPercentage || 0) - (ecoMaterial?.plasticPercentage || 0);

    return {
      standardPackaging: {
        material: standardResult.material,
        carbonGeneratedKg: standardResult.carbonGeneratedKg,
        ecoScore: standardEcoScore,
      },
      ecoPackaging: {
        material: ecoResult.material,
        carbonGeneratedKg: ecoResult.carbonGeneratedKg,
        ecoScore: ecoEcoScore,
      },
      savings: {
        carbonSavedKg: Number(carbonSaved.toFixed(3)),
        plasticSavedPercent,
        ecoScoreDifference: ecoEcoScore - standardEcoScore,
      }
    };
  }
}
