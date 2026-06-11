import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { RewardsController } from './rewards.controller';
import { redeemTreesSchema, orderCompleteWebhookSchema } from './rewards.validation';
import { authenticateUser } from '../../middleware/auth.middleware';

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

// --- AUTOMATION WEBHOOK ---
// In a real app, this should be protected by an internal API key or service mesh auth
router.post('/webhook/order-complete', validate(orderCompleteWebhookSchema), RewardsController.processOrderRewards);

// --- USER FACING ROUTES ---
router.use(authenticateUser);

router.get('/wallet', RewardsController.getWallet);
router.get('/badges', RewardsController.getBadges);
router.get('/level', RewardsController.getLevel);
router.get('/leaderboard', RewardsController.getLeaderboard);
router.get('/challenges', RewardsController.getChallenges);
router.post('/redeem', validate(redeemTreesSchema), RewardsController.redeemTree);

export default router;
