import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ProductsController } from './products.controller';
import { createProductSchema, updateProductSchema, nearbySearchSchema } from './products.validation';
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

// --- DISCOVERY ROUTES (Public or User facing) ---
router.get('/search', ProductsController.searchProducts);
router.get('/nearby', validate(nearbySearchSchema), ProductsController.getNearbyProducts);
router.get('/recommendations', authenticateUser, ProductsController.getRecommendations);
router.get('/:id', ProductsController.getProductDetails);
router.get('/:id/alternatives', ProductsController.getAlternatives);

// --- MANAGEMENT ROUTES (Seller / Admin) ---
router.use(authenticateUser);

router.post('/', authorizeRoles('seller', 'admin'), validate(createProductSchema), ProductsController.createProduct);
router.put('/:id', authorizeRoles('seller', 'admin'), validate(updateProductSchema), ProductsController.updateProduct);
router.delete('/:id', authorizeRoles('seller', 'admin'), ProductsController.deleteProduct);

export default router;
