import { Request, Response, NextFunction } from 'express';
import { PackagingOptimizationService } from './services/packaging-optimization.service';
import { CheckoutPackagingComparisonService } from './services/checkout-packaging-comparison.service';
import { SellerPackagingAnalyticsService } from './services/seller-packaging-analytics.service';
import { PackagingPlatformAnalyticsService } from './services/packaging-platform-analytics.service';
import PackagingMaterial from '../../models/PackagingMaterial';
import Order from '../../models/Order';
import { AppError } from '../../utils/AppError';

export const PackagingController = {
  async optimize(req: Request, res: Response, next: NextFunction) {
    try {
      const { products, preferredType } = req.body;
      const result = await PackagingOptimizationService.optimize(products, preferredType);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  },

  async compare(req: Request, res: Response, next: NextFunction) {
    try {
      const { products } = req.body;
      const result = await CheckoutPackagingComparisonService.compareOptions(products);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  },

  async getMaterials(req: Request, res: Response, next: NextFunction) {
    try {
      const materials = await PackagingMaterial.find().select('-__v');
      res.status(200).json({ status: 'success', data: { materials } });
    } catch (error) { next(error); }
  },

  async getOrderPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) return next(new AppError('Order not found', 404));
      
      // In a real scenario, you'd save the specific Box ID on the order. 
      // For now, we return the packaging option selected.
      res.status(200).json({ 
        status: 'success', 
        data: { packagingOptionSelected: order.packagingOptionSelected } 
      });
    } catch (error) { next(error); }
  },

  async getSellerAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SellerPackagingAnalyticsService.getAnalytics((req as any).user.id);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  },

  async getPlatformAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PackagingPlatformAnalyticsService.getPlatformSummary();
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  }
};
