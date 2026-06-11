import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AuthController } from './auth.controller';
import { authenticateUser } from '../../middleware/auth.middleware';
import { authRateLimiter } from '../../middleware/security.middleware';
import { 
  registerSchema, 
  loginSchema, 
  refreshTokenSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema, 
  changePasswordSchema 
} from './auth.validation';

const router = Router();

// Validation Middleware Helper
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

router.post('/register', authRateLimiter, validate(registerSchema), AuthController.register);
router.post('/login', authRateLimiter, validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshTokenSchema), AuthController.refresh);
router.post('/forgot-password', validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

// Protected routes
router.use(authenticateUser);
router.post('/logout', AuthController.logout);
router.post('/change-password', validate(changePasswordSchema), AuthController.changePassword);

export default router;
