import fs from 'fs';
import path from 'path';

export class RewardCalculationService {
  private static rules: Record<string, { coins: number; credits: number }> | null = null;

  private static loadRules() {
    if (!this.rules) {
      const rulesPath = path.resolve(__dirname, '../config/reward-rules.json');
      const data = fs.readFileSync(rulesPath, 'utf-8');
      this.rules = JSON.parse(data);
    }
    return this.rules!;
  }

  /**
   * Calculates total Sapling Coins and Green Credits earned for a given order context.
   */
  static calculateOrderRewards(orderContext: {
    ecoScore: number;
    isGroupDelivery: boolean;
    isMinimalPackaging: boolean;
    isLocalProduct: boolean;
    isVerifiedGreenSeller: boolean;
  }) {
    const rules = this.loadRules();
    let totalCoins = 0;
    let totalCredits = 0;
    const sourcesEarned: string[] = [];

    if (orderContext.ecoScore >= 90) {
      totalCoins += rules['ecoScore_gt_90'].coins;
      totalCredits += rules['ecoScore_gt_90'].credits;
      sourcesEarned.push('ecoScore_gt_90');
    } else if (orderContext.ecoScore >= 80) {
      totalCoins += rules['ecoScore_gt_80'].coins;
      totalCredits += rules['ecoScore_gt_80'].credits;
      sourcesEarned.push('ecoScore_gt_80');
    }

    if (orderContext.isGroupDelivery) {
      totalCoins += rules['group_delivery'].coins;
      totalCredits += rules['group_delivery'].credits;
      sourcesEarned.push('group_delivery');
    }

    if (orderContext.isMinimalPackaging) {
      totalCoins += rules['minimal_packaging'].coins;
      totalCredits += rules['minimal_packaging'].credits;
      sourcesEarned.push('minimal_packaging');
    }

    if (orderContext.isLocalProduct) {
      totalCoins += rules['local_product'].coins;
      totalCredits += rules['local_product'].credits;
      sourcesEarned.push('local_product');
    }

    if (orderContext.isVerifiedGreenSeller) {
      totalCoins += rules['verified_green_seller'].coins;
      totalCredits += rules['verified_green_seller'].credits;
      sourcesEarned.push('verified_green_seller');
    }

    return { totalCoins, totalCredits, sourcesEarned };
  }
}
