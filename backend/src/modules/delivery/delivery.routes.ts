import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { DeliveryController } from './delivery.controller';
import { routeRequestSchema, greenRequestSchema, groupRequestSchema, radiusQuerySchema, nudgeQuerySchema } from './delivery.validation';
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

router.post('/route', validate(routeRequestSchema), DeliveryController.getRoute);
router.post('/green', validate(greenRequestSchema), DeliveryController.getGreenOptions);
router.post('/group', validate(groupRequestSchema), authorizeRoles('admin', 'seller'), DeliveryController.createGroupClusters);
router.get('/recommendations', validate(nudgeQuerySchema), DeliveryController.getRecommendations);
router.get('/impact', DeliveryController.getUserImpact);
router.get('/sustainability-radius', validate(radiusQuerySchema), DeliveryController.getSustainabilityRadius);

// Seller Route
router.get('/analytics/seller', authorizeRoles('seller', 'admin'), DeliveryController.getSellerAnalytics);

// Admin Route
router.get('/analytics/platform', authorizeRoles('admin'), DeliveryController.getPlatformAnalytics);

export default router;
