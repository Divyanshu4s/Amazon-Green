import { Request, Response, NextFunction } from 'express';
import { UserImpactService } from './services/user-impact.service';
import { TimeSeriesAnalyticsService } from './services/time-series-analytics.service';
import { InsightGenerationService } from './services/insight-generation.service';
import { GoalTrackingService } from './services/goal-tracking.service';
import { SellerAnalyticsService } from './services/seller-analytics.service';
import { PlatformAnalyticsService } from './services/platform-analytics.service';
import { LeaderboardAnalyticsService } from './services/leaderboard-analytics.service';
import { EnvironmentalImpactConverter } from './services/environmental-impact-converter.service';
import { EcoAnalyticsService } from './services/eco-analytics.service';
import { PurchaseAnalyticsService } from './services/purchase-analytics.service';

export const AnalyticsController = {
  // --- USER DASHBOARD ---
  async getUserDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const [impact, ecoScoreStats, purchaseStats] = await Promise.all([
        UserImpactService.getLifetimeImpact(userId),
        EcoAnalyticsService.getEcoScoreAnalytics(userId),
        PurchaseAnalyticsService.getPurchaseAnalytics(userId)
      ]);

      const equivalencies = EnvironmentalImpactConverter.convert(
        impact.totalCarbonSavedKg, 
        impact.plasticWasteReducedKg
      );

      res.status(200).json({ 
        status: 'success', 
        data: { impact, ecoScoreStats, purchaseStats, equivalencies } 
      });
    } catch (error) { next(error); }
  },

  async getUserTimeline(req: Request, res: Response, next: NextFunction) {
    try {
      const timeframe = req.query.timeframe as any;
      const timeline = await TimeSeriesAnalyticsService.getImpactTimeline((req as any).user.id, timeframe);
      res.status(200).json({ status: 'success', data: { timeline } });
    } catch (error) { next(error); }
  },

  async getUserInsights(req: Request, res: Response, next: NextFunction) {
    try {
      const insights = await InsightGenerationService.generatePersonalizedInsights((req as any).user.id);
      res.status(200).json({ status: 'success', data: { insights } });
    } catch (error) { next(error); }
  },

  async getUserGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const goals = await GoalTrackingService.getUserGoals((req as any).user.id);
      res.status(200).json({ status: 'success', data: { goals } });
    } catch (error) { next(error); }
  },

  async createGoal(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, targetValue, deadline } = req.body;
      const goal = await GoalTrackingService.createGoal((req as any).user.id, type, targetValue, deadline);
      res.status(201).json({ status: 'success', data: { goal } });
    } catch (error) { next(error); }
  },

  // --- SELLER DASHBOARD ---
  async getSellerDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SellerAnalyticsService.getSellerDashboard((req as any).user.id);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  },

  // --- ADMIN DASHBOARD ---
  async getPlatformDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PlatformAnalyticsService.getPlatformSummary();
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  },

  // --- PUBLIC/GLOBAL ---
  async getLeaderboards(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 10;
      const data = await LeaderboardAnalyticsService.getTopRankings(limit);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  }
};
