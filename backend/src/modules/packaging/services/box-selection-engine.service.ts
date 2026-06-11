export interface BoxDimension {
  id: string;
  length: number; // cm
  width: number;
  height: number;
  volume: number; // cm3
  maxWeight: number; // kg
}

export class BoxSelectionEngine {
  // Hardcoded standard e-commerce box sizes to ensure ultra-fast lookup (O(N))
  // Ordered by volume ascending
  private static STANDARD_BOXES: BoxDimension[] = [
    { id: 'SMALL_ENVELOPE', length: 25, width: 20, height: 2, volume: 1000, maxWeight: 1 },
    { id: 'SMALL_BOX', length: 20, width: 20, height: 15, volume: 6000, maxWeight: 5 },
    { id: 'MEDIUM_BOX', length: 35, width: 25, height: 20, volume: 17500, maxWeight: 15 },
    { id: 'LARGE_BOX', length: 50, width: 40, height: 30, volume: 60000, maxWeight: 30 },
    { id: 'EXTRA_LARGE_BOX', length: 60, width: 50, height: 40, volume: 120000, maxWeight: 50 },
  ];

  /**
   * Finds the smallest viable box that fits the requested dimensions.
   * Assumes basic fluid volume packing for heuristic speed, combined with max dimension checks.
   */
  static selectOptimalBox(totalVolume: number, maxLength: number, maxWidth: number, maxHeight: number, totalWeight: number) {
    for (const box of this.STANDARD_BOXES) {
      if (
        box.volume >= totalVolume &&
        box.length >= maxLength &&
        box.width >= maxWidth &&
        box.height >= maxHeight &&
        box.maxWeight >= totalWeight
      ) {
        // We found a fit! Calculate packing efficiency
        const efficiency = (totalVolume / box.volume) * 100;
        return {
          box,
          packingEfficiency: Number(efficiency.toFixed(2)),
          unusedVolume: box.volume - totalVolume,
        };
      }
    }

    // If no single box fits, fallback to the largest box (would require multi-box splitting in a more advanced algo)
    const largestBox = this.STANDARD_BOXES[this.STANDARD_BOXES.length - 1];
    return {
      box: largestBox,
      packingEfficiency: 100, // Maxed out
      unusedVolume: 0,
      note: 'Item exceeds standard box sizes. May require split shipments or custom freight.'
    };
  }
}
