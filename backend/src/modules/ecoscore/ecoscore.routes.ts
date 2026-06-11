import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { EcoScoreController } from './ecoscore.controller';
import { calculateEcoScoreSchema, auditEcoScoreSchema } from './ecoscore.validation';

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

// Routes
router.post('/calculate', validate(calculateEcoScoreSchema), EcoScoreController.calculateScore);
router.post('/audit', validate(auditEcoScoreSchema), EcoScoreController.auditProduct);
router.get('/:productId', EcoScoreController.getProductScore);
router.get('/audit/:auditId', EcoScoreController.getAudit);

export default router;
