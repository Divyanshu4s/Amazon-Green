import { Request, Response, NextFunction } from 'express';
import { EcoScoreService } from './services/ecoscore.service';
import { GreenZoneAuditService } from './services/green-zone-audit.service';
import { AppError } from '../../utils/AppError';
import EcoScoreAudit from '../../models/EcoScoreAudit';
import Product from '../../models/Product';

export const EcoScoreController = {
  async calculateScore(req: Request, res: Response, next: NextFunction) {
    try {
      const result = EcoScoreService.calculateScore(req.body);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async auditProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, ...calculateDto } = req.body;
      const auditResult = await GreenZoneAuditService.performAudit(productId, calculateDto);
      
      res.status(201).json({
        status: 'success',
        data: auditResult,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProductScore(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await Product.findById(req.params.productId).select(
        'ecoScore ecoGrade materialScore userImpactScore durabilityScore packagingScore localityScore'
      );
      
      if (!product) {
        throw new AppError('Product not found', 404);
      }

      res.status(200).json({
        status: 'success',
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  },

  async getAudit(req: Request, res: Response, next: NextFunction) {
    try {
      const audit = await EcoScoreAudit.findById(req.params.auditId).populate('product', 'title category');
      
      if (!audit) {
        throw new AppError('Audit not found', 404);
      }

      res.status(200).json({
        status: 'success',
        data: { audit },
      });
    } catch (error) {
      next(error);
    }
  },
};
