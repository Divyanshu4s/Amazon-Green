export class GroupDeliveryRewardService {
  /**
   * Calculates the rewards for participating in a group delivery.
   */
  static calculateReward(tripsAvoidedOverall: number) {
    const baseCoins = 20;
    
    // Bonus for high-density groups
    const densityBonus = tripsAvoidedOverall > 5 ? 10 : 0;
    
    return {
      saplingCoins: baseCoins + densityBonus,
      greenCredits: 1 // Token green credit for logistics optimization
    };
  }
}
