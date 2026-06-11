import { BoxSelectionEngine } from './box-selection-engine.service';

export interface CartProduct {
  productId: string;
  quantity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
}

export class OrderPackagingOptimizer {
  /**
   * Calculates the combined volume of a multi-product order and selects the optimal box.
   */
  static optimizeOrder(products: CartProduct[]) {
    let totalVolume = 0;
    let totalWeight = 0;
    let maxLength = 0;
    let maxWidth = 0;
    let maxHeight = 0;

    // Fast 3D Heuristic: Sum volumes, but find the max single dimension across all items
    // to ensure the items physically fit into the box's boundaries.
    for (const item of products) {
      const itemVolume = item.length * item.width * item.height;
      totalVolume += itemVolume * item.quantity;
      totalWeight += item.weight * item.quantity;

      // Keep track of largest dimensions to ensure the item fits in the door of the box
      if (item.length > maxLength) maxLength = item.length;
      if (item.width > maxWidth) maxWidth = item.width;
      if (item.height > maxHeight) maxHeight = item.height;
    }

    // Add a 10% buffer for packing peanuts / air pillows / dunnage
    const bufferedVolume = totalVolume * 1.1;

    const result = BoxSelectionEngine.selectOptimalBox(
      bufferedVolume,
      maxLength,
      maxWidth,
      maxHeight,
      totalWeight
    );

    return {
      totalProductVolume: totalVolume,
      totalWeight,
      boxesRequired: 1, // Simplified for now
      optimalBox: result.box,
      packingEfficiency: result.packingEfficiency,
      volumeSavedVsStandard: this.calculateVolumeSaved(result.box.volume, bufferedVolume)
    };
  }

  /**
   * Compares the optimal box against a theoretically inefficient "Standard" unoptimized packaging baseline
   * where items might have been shipped in separate boxes or oversized boxes.
   */
  private static calculateVolumeSaved(optimalBoxVolume: number, requiredVolume: number) {
    // Assume a non-optimized baseline uses 40% more volume
    const baselineVolume = requiredVolume * 1.4;
    return Math.max(0, baselineVolume - optimalBoxVolume);
  }
}
