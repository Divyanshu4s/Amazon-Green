import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { PackagingController } from './packaging.controller';
import { optimizeRequestSchema, compareRequestSchema } from './packaging.validation';
import { authenticateUser, authorizeRoles } from '../../middleware/auth.middleware';

const router = Router();

const validate = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({ status: 'fail', errors: e.errors });
    }
};

router.use(authenticateUser);

router.post('/optimize', validate(optimizeRequestSchema), PackagingController.optimize);
router.post('/compare', validate(compareRequestSchema), PackagingController.compare);
router.get('/materials', PackagingController.getMaterials);
router.get('/order/:orderId', PackagingController.getOrderPackaging);

// Seller Route
router.get('/analytics/seller', authorizeRoles('seller', 'admin'), PackagingController.getSellerAnalytics);

// Admin Route
router.get('/analytics/platform', authorizeRoles('admin'), PackagingController.getPlatformAnalytics);

export default router;
