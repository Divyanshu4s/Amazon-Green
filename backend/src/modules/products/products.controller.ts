import { Request, Response, NextFunction } from 'express';
import { ProductManagementService } from './services/product-management.service';
import { ProductDiscoveryService } from './services/product-discovery.service';
import { RecommendationService } from './services/recommendation.service';

export const ProductsController = {
  // --- MANAGEMENT ---
  
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user.id;
      const product = await ProductManagementService.createProduct(sellerId, req.body);
      
      res.status(201).json({
        status: 'success',
        data: { product }
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const role = (req as any).user.role;
      const product = await ProductManagementService.updateProduct((req.params.id as string), userId, role, req.body);
      
      res.status(200).json({
        status: 'success',
        data: { product }
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const role = (req as any).user.role;
      await ProductManagementService.deleteProduct((req.params.id as string), userId, role);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  // --- DISCOVERY ---

  async getProductDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductDiscoveryService.getProductDetails((req.params.id as string));
      res.status(200).json({ status: 'success', data: { product } });
    } catch (error) {
      next(error);
    }
  },

  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductDiscoveryService.searchProducts(req.query);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  },

  async getNearbyProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lng, radius } = req.query;
      const products = await ProductDiscoveryService.getNearbySustainableProducts(
        Number(lat), Number(lng), Number(radius)
      );
      res.status(200).json({ status: 'success', data: { products } });
    } catch (error) {
      next(error);
    }
  },

  async getAlternatives(req: Request, res: Response, next: NextFunction) {
    try {
      const alternatives = await ProductDiscoveryService.getGreenAlternatives((req.params.id as string));
      res.status(200).json({ status: 'success', data: { alternatives } });
    } catch (error) {
      next(error);
    }
  },

  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const recommendations = await RecommendationService.getPersonalizedRecommendations(userId);
      res.status(200).json({ status: 'success', data: { recommendations } });
    } catch (error) {
      next(error);
    }
  }
};
