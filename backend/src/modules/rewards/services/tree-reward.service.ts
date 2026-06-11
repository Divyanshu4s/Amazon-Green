import User from '../../../models/User';
import TreePlantationReward, { PlantationStatus } from '../../../models/TreePlantationReward';
import GreenCreditTransaction, { TransactionSource } from '../../../models/GreenCreditTransaction';
import { AppError } from '../../../utils/AppError';

export class TreeRewardService {
  private static COIN_COST_PER_TREE = 1000;

  /**
   * Redeems Sapling Coins for real-world trees.
   * 1000 Coins = 1 Sapling.
   * 5000 Coins = Mini Forest (5 trees).
   */
  static async redeemTrees(userId: string, requestedTrees: number) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const cost = requestedTrees * this.COIN_COST_PER_TREE;

    if (user.saplingCoins < cost) {
      throw new AppError(`Insufficient Sapling Coins. You need ${cost} coins but have ${user.saplingCoins}.`, 400);
    }

    // Deduct coins
    user.saplingCoins -= cost;
    user.treesPlanted += requestedTrees;
    await user.save();

    // Log the transaction
    await GreenCreditTransaction.create({
      user: user._id,
      source: TransactionSource.REDEMPTION,
      creditsEarned: 0,
      creditsSpent: cost, // Tracking sapling coins spent here conceptually
    });

    // Create the Plantation Request
    const reward = await TreePlantationReward.create({
      user: user._id,
      coinsRedeemed: cost,
      saplingsGenerated: requestedTrees,
      status: PlantationStatus.REQUESTED,
    });

    return {
      message: `Successfully redeemed ${cost} coins for ${requestedTrees} trees!`,
      saplingCoinsBalance: user.saplingCoins,
      treesPlantedTotal: user.treesPlanted,
      rewardRecord: reward
    };
  }
}
