import { Request, Response, NextFunction } from 'express';
import { PersonalizationService } from './services/personalization.service';
import { GreenerAlternativeService } from './services/greener-alternative.service';
import { LocalSustainabilityService } from './services/local-sustainability.service';
import { BundleRecommendationService } from './services/bundle-recommendation.service';
import { TrendingSustainabilityService } from './services/trending-sustainability.service';
import { RecommendationTrackingService } from './services/recommendation-tracking.service';
import { RecommendationAnalyticsService } from './services/recommendation-analytics.service';
import { RecommendationType } from '../../models/RecommendationLog';

export const RecommendationsController = {
  async getPersonalized(req: Request, res: Response, next: NextFunction) {
    try {
      const feed = await PersonalizationService.getPersonalizedFeed((req as any).user.id);
      
      // Auto-log views
      feed.forEach(f => {
        if(f.product) RecommendationTrackingService.logInteraction((req as any).user.id, f.product._id, RecommendationType.PERSONALIZED, 'view', f.product.ecoScore, f.mlMetrics.clickProbability);
      });

      res.status(200).json({ status: 'success', data: feed });
    } catch (error) { next(error); }
  },

  async getAlternatives(req: Request, res: Response, next: NextFunction) {
    try {
      const alternatives = await GreenerAlternativeService.getAlternatives(req.params.productId as string);
      
      alternatives.forEach(a => {
        if(a.product) RecommendationTrackingService.logInteraction((req as any).user.id, a.product._id, RecommendationType.ALTERNATIVE, 'view', a.product.ecoScore, 0.8);
      });

      res.status(200).json({ status: 'success', data: alternatives });
    } catch (error) { next(error); }
  },

  async getLocal(req: Request, res: Response, next: NextFunction) {
    try {
      const lat = Number(req.query.lat);
      const lng = Number(req.query.lng);
      const radius = Number(req.query.radius) || 20;

      const localProducts = await LocalSustainabilityService.getLocalProducts(lat, lng, radius);
      res.status(200).json({ status: 'success', data: localProducts });
    } catch (error) { next(error); }
  },

  async getBundles(req: Request, res: Response, next: NextFunction) {
    try {
      const bundles = await BundleRecommendationService.getBundles();
      res.status(200).json({ status: 'success', data: bundles });
    } catch (error) { next(error); }
  },

  async getTrending(req: Request, res: Response, next: NextFunction) {
    try {
      const trending = await TrendingSustainabilityService.getTrendingGreenProducts();
      res.status(200).json({ status: 'success', data: trending });
    } catch (error) { next(error); }
  },

  async trackAction(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, type, action, ecoScore, confidence } = req.body;
      await RecommendationTrackingService.logInteraction((req as any).user.id, productId, type, action, ecoScore, confidence);
      res.status(200).json({ status: 'success', message: 'Tracked' });
    } catch (error) { next(error); }
  },

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const metrics = await RecommendationAnalyticsService.getEngineMetrics();
      res.status(200).json({ status: 'success', data: metrics });
    } catch (error) { next(error); }
  }
};
