import { Router, Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AuditController } from './audit.controller';
import { requestAuditSchema, uploadDocumentSchema, runAuditSchema, adminActionSchema } from './audit.validation';
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

// Seller endpoints
router.post('/request', authorizeRoles('seller', 'admin'), validate(requestAuditSchema), AuditController.requestAudit);
router.post('/upload-documents', authorizeRoles('seller', 'admin'), validate(uploadDocumentSchema), AuditController.uploadDocument);
router.get('/status/:sellerId', authorizeRoles('seller', 'admin'), AuditController.getStatus);
router.get('/history/:sellerId', authorizeRoles('seller', 'admin'), AuditController.getHistory);
router.get('/improvements/:sellerId', authorizeRoles('seller', 'admin'), AuditController.getImprovements);

// System/Admin endpoints to trigger workflow
router.post('/run', authorizeRoles('admin'), validate(runAuditSchema), AuditController.runAudit);

// Admin manual review endpoints
router.post('/admin/approve', authorizeRoles('admin'), validate(adminActionSchema), AuditController.adminApprove);
router.post('/admin/reject', authorizeRoles('admin'), validate(adminActionSchema), AuditController.adminReject);
router.get('/analytics/platform', authorizeRoles('admin'), AuditController.getAnalytics);

export default router;
