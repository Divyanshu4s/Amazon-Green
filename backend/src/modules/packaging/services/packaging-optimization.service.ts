import PackagingMaterial, { PackagingTypeEnum } from '../../../models/PackagingMaterial';
import { AppError } from '../../../utils/AppError';
import { OrderPackagingOptimizer, CartProduct } from './order-packaging-optimizer.service';
import { PackagingCarbonService } from './packaging-carbon.service';

export class PackagingOptimizationService {
  /**
   * Main entry point for optimizing the packaging of an order payload.
   */
  static async optimize(products: CartProduct[], preferredPackagingType: PackagingTypeEnum) {
    if (!products || products.length === 0) {
      throw new AppError('Products array cannot be empty', 400);
    }

    // 1. Find optimal physical box
    const binPackingResult = OrderPackagingOptimizer.optimizeOrder(products);

    // 2. Fetch appropriate material from DB
    const material = await PackagingMaterial.findOne({ materialType: preferredPackagingType });
    if (!material) {
      throw new AppError(`Material of type ${preferredPackagingType} not found in database.`, 404);
    }

    // 3. Calculate Weight and Carbon
    const boxWeightKg = PackagingCarbonService.estimateBoxWeightKg(binPackingResult.optimalBox.volume);
    const carbonEmissions = PackagingCarbonService.calculateEmissions(material.carbonFactor, boxWeightKg);

    return {
      recommendedPackaging: preferredPackagingType,
      material: material.name,
      boxSelected: binPackingResult.optimalBox.id,
      utilization: binPackingResult.packingEfficiency,
      wasteReductionPercentage: Number(((binPackingResult.volumeSavedVsStandard / (binPackingResult.totalProductVolume * 1.4)) * 100).toFixed(2)),
      carbonGeneratedKg: Number(carbonEmissions.toFixed(3)),
    };
  }
}
