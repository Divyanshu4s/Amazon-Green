import { PackagingTypeEnum } from '../../../models/PackagingMaterial';

export class PackagingRewardService {
  /**
   * Determines the number of Sapling Coins to award based purely on packaging choice.
   */
  static calculatePackagingCoins(type: PackagingTypeEnum): number {
    switch (type) {
      case PackagingTypeEnum.COMPOSTABLE:
        return 20;
      case PackagingTypeEnum.ECO:
        return 15;
      case PackagingTypeEnum.MINIMAL:
        return 10;
      case PackagingTypeEnum.RECYCLED:
        return 10;
      case PackagingTypeEnum.STANDARD:
      default:
        return 0;
    }
  }
}
