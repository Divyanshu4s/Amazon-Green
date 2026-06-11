import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AnalyticsController } from './analytics.controller';
import { createGoalSchema, timelineQuerySchema } from './analytics.validation';
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

// --- USER DASHBOARD ---
router.get('/user', AnalyticsController.getUserDashboard);
router.get('/user/timeline', validate(timelineQuerySchema), AnalyticsController.getUserTimeline);
router.get('/user/insights', AnalyticsController.getUserInsights);
router.get('/user/goals', AnalyticsController.getUserGoals);
router.post('/user/goals', validate(createGoalSchema), AnalyticsController.createGoal);

// --- SELLER DASHBOARD ---
router.get('/seller', authorizeRoles('seller', 'admin'), AnalyticsController.getSellerDashboard);

// --- ADMIN DASHBOARD ---
router.get('/platform', authorizeRoles('admin'), AnalyticsController.getPlatformDashboard);
router.get('/admin', authorizeRoles('admin'), AnalyticsController.getPlatformDashboard); // alias

// --- GLOBAL ---
router.get('/leaderboards', AnalyticsController.getLeaderboards);

export default router;
