import { Request, Response, NextFunction } from 'express';
import { PollutionAwareRoutingService } from './services/pollution-aware-routing.service';
import { RouteScoreEngine } from './services/route-score-engine.service';
import { DeliveryCarbonService } from './services/delivery-carbon.service';
import { GreenDeliveryService } from './services/green-delivery.service';
import { GroupDeliveryService } from './services/group-delivery.service';
import { SustainabilityRadiusService } from './services/sustainability-radius.service';
import { DeliveryRecommendationService } from './services/delivery-recommendation.service';
import { DeliveryAnalyticsService } from './services/delivery-analytics.service';
import { SellerDeliveryAnalyticsService } from './services/seller-delivery-analytics.service';
import { PlatformDeliveryAnalyticsService } from './services/platform-delivery-analytics.service';

export const DeliveryController = {
  async getRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const { origin, destination, vehicleType } = req.body;
      const route = await PollutionAwareRoutingService.calculateRoute({ origin, destination, vehicleType });
      const carbon = DeliveryCarbonService.calculateEmissions(route.distanceKm, vehicleType, 5); // Assume 5kg payload for standard check
      const score = RouteScoreEngine.calculateRouteScore({
        distanceKm: route.distanceKm,
        trafficCongestionLevel: route.realTimeFactors.trafficCongestionLevel,
        currentAQI: route.realTimeFactors.currentAQI,
        carbonEmissionsKg: carbon.co2EmissionsKg,
        vehicleType
      });

      res.status(200).json({ status: 'success', data: { route, carbon, score } });
    } catch (error) { next(error); }
  },

  async getGreenOptions(req: Request, res: Response, next: NextFunction) {
    try {
      const { origin, destination, payloadWeightKg } = req.body;
      const options = await GreenDeliveryService.evaluateDeliveryOptions(origin, destination, payloadWeightKg);
      res.status(200).json({ status: 'success', data: options });
    } catch (error) { next(error); }
  },

  async createGroupClusters(req: Request, res: Response, next: NextFunction) {
    try {
      const { orders, radiusKm } = req.body;
      const clusters = await GroupDeliveryService.createClusters(orders, radiusKm);
      res.status(201).json({ status: 'success', data: { clustersCreated: clusters.length, clusters } });
    } catch (error) { next(error); }
  },

  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const distanceKm = Number(req.query.distanceKm);
      const isLocalBetter = req.query.isLocalBetter === 'true';
      const localCarbonSavedKg = Number(req.query.localCarbonSavedKg) || 0;

      const nudges = DeliveryRecommendationService.generateNudges(distanceKm, isLocalBetter, localCarbonSavedKg);
      res.status(200).json({ status: 'success', data: { nudges } });
    } catch (error) { next(error); }
  },

  async getSustainabilityRadius(req: Request, res: Response, next: NextFunction) {
    try {
      const lat = Number(req.query.lat);
      const lng = Number(req.query.lng);
      const radius = Number(req.query.radius);

      const [products, sellers] = await Promise.all([
        SustainabilityRadiusService.findNearbyEcoProducts(lat, lng, radius),
        SustainabilityRadiusService.findNearbyGreenSellers(lat, lng, radius)
      ]);

      res.status(200).json({ status: 'success', data: { products, sellers } });
    } catch (error) { next(error); }
  },

  async getUserImpact(req: Request, res: Response, next: NextFunction) {
    try {
      const impact = await DeliveryAnalyticsService.getUserDeliveryImpact((req as any).user.id);
      res.status(200).json({ status: 'success', data: impact });
    } catch (error) { next(error); }
  },

  async getSellerAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SellerDeliveryAnalyticsService.getSellerLogisticsImpact((req as any).user.id);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  },

  async getPlatformAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PlatformDeliveryAnalyticsService.getPlatformSummary();
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  }
};
