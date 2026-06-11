import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { RecommendationsController } from './recommendations.controller';
import { localRecommendSchema, trackRecommendationSchema } from './recommendations.validation';
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

router.get('/personalized', RecommendationsController.getPersonalized);
router.get('/alternatives/:productId', RecommendationsController.getAlternatives);
router.get('/local', validate(localRecommendSchema), RecommendationsController.getLocal);
router.get('/bundles', RecommendationsController.getBundles);
router.get('/trending', RecommendationsController.getTrending);

router.post('/track', validate(trackRecommendationSchema), RecommendationsController.trackAction);

// Admin Only
router.get('/analytics/platform', authorizeRoles('admin'), RecommendationsController.getAnalytics);

export default router;
