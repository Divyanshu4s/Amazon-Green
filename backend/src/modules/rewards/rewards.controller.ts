import { Request, Response, NextFunction } from 'express';
import { WalletService, TransactionService } from './services/wallet.service';
import { BadgeEngine } from './services/badge-engine.service';
import { EcoLevelService } from './services/eco-level.service';
import { TreeRewardService } from './services/tree-reward.service';
import { LeaderboardService } from './services/leaderboard.service';
import { ChallengeService } from './services/challenge.service';
import { RewardCalculationService } from './services/reward-calculation.service';
import { ImpactTrackingService } from './services/impact-tracking.service';
import { TransactionSource } from '../../models/GreenCreditTransaction';
import User from '../../models/User';

export const RewardsController = {
  async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WalletService.getWalletData((req as any).user.id);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  },

  async getBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById((req as any).user.id).select('badges');
      res.status(200).json({ status: 'success', data: { badges: user?.badges || [] } });
    } catch (error) {
      next(error);
    }
  },

  async getLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const levelData = await EcoLevelService.evaluateLevel((req as any).user.id);
      res.status(200).json({ status: 'success', data: levelData });
    } catch (error) {
      next(error);
    }
  },

  async redeemTree(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TreeRewardService.redeemTrees((req as any).user.id, req.body.requestedTrees);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  },

  async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const type = req.query.type as 'carbon' | 'trees' || 'carbon';
      const data = await LeaderboardService.getLeaderboard(type);
      res.status(200).json({ status: 'success', data: { leaderboard: data } });
    } catch (error) {
      next(error);
    }
  },

  async getChallenges(req: Request, res: Response, next: NextFunction) {
    try {
      const challenges = await ChallengeService.getUserChallenges((req as any).user.id);
      res.status(200).json({ status: 'success', data: { challenges } });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Internal webhook called when an order is completed to distribute all rewards automatically.
   */
  async processOrderRewards(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, ecoScore, isGroupDelivery, isMinimalPackaging, isLocalProduct, isVerifiedGreenSeller, estimatedCarbonSaved, estimatedPlasticSaved } = req.body;
      
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

      // 1. Calculate Rewards
      const { totalCoins, totalCredits } = RewardCalculationService.calculateOrderRewards({
        ecoScore, isGroupDelivery, isMinimalPackaging, isLocalProduct, isVerifiedGreenSeller
      });

      // 2. Award Coins and Update User
      user.saplingCoins += totalCoins;
      user.greenCredits += totalCredits;
      await user.save();

      // 3. Log Transactions
      if (totalCoins > 0 || totalCredits > 0) {
        await TransactionService.logEarning(userId, TransactionSource.ECO_PURCHASE, totalCredits); // Logging credits for simplicity
      }

      // 4. Update Impact Tracking
      await ImpactTrackingService.logImpact(userId, {
        carbonSavedDelta: estimatedCarbonSaved,
        plasticSavedDelta: estimatedPlasticSaved,
        ecoScoreContribution: ecoScore
      });

      // 5. Evaluate Badges and Level
      const newBadges = await BadgeEngine.evaluateAndAssignBadges(userId);
      const levelUpData = await EcoLevelService.evaluateLevel(userId);

      res.status(200).json({
        status: 'success',
        data: {
          coinsEarned: totalCoins,
          creditsEarned: totalCredits,
          newBadges,
          leveledUp: levelUpData?.leveledUp,
          newLevel: levelUpData?.currentLevel
        }
      });
    } catch (error) {
      next(error);
    }
  }
};
