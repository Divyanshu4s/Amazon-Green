import { Request, Response, NextFunction } from 'express';
import { AuditRequestService } from './services/audit-request.service';
import { SellerDocumentService } from './services/seller-document.service';
import { AuditWorkflowService } from './services/audit-workflow.service';
import { AuditHistoryService } from './services/audit-history.service';
import { SellerImprovementService } from './services/seller-improvement.service';
import { AdminAuditService } from './services/admin-audit.service';
import { SellerAuditAnalyticsService } from './services/seller-audit-analytics.service';

export const AuditController = {
  async requestAudit(req: Request, res: Response, next: NextFunction) {
    try {
      const { sellerId, claims, manufacturingInfo, materialInfo } = req.body;
      const request = await AuditRequestService.createRequest(sellerId, { claims, manufacturingInfo, materialInfo });
      res.status(201).json({ status: 'success', data: request });
    } catch (error) { next(error); }
  },

  async uploadDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const { sellerId, certificationName, customName, certificateFileUrl, issueDate, expiryDate } = req.body;
      const doc = await SellerDocumentService.uploadDocument(sellerId, certificationName, customName, certificateFileUrl, new Date(issueDate), new Date(expiryDate));
      res.status(201).json({ status: 'success', data: doc });
    } catch (error) { next(error); }
  },

  async runAudit(req: Request, res: Response, next: NextFunction) {
    try {
      const { auditRequestId } = req.body;
      const result = await AuditWorkflowService.triggerAudit(auditRequestId);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  },

  async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await AuditRequestService.getStatus(req.params.sellerId);
      res.status(200).json({ status: 'success', data: status });
    } catch (error) { next(error); }
  },

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const history = await AuditHistoryService.getHistory(req.params.sellerId);
      res.status(200).json({ status: 'success', data: history });
    } catch (error) { next(error); }
  },

  async getImprovements(req: Request, res: Response, next: NextFunction) {
    try {
      const insights = await SellerImprovementService.generateInsights(req.params.sellerId);
      res.status(200).json({ status: 'success', data: { insights } });
    } catch (error) { next(error); }
  },

  async adminApprove(req: Request, res: Response, next: NextFunction) {
    try {
      const { auditRequestId, notes } = req.body;
      const result = await AdminAuditService.approveAudit(auditRequestId, notes);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  },

  async adminReject(req: Request, res: Response, next: NextFunction) {
    try {
      const { auditRequestId, notes } = req.body;
      const result = await AdminAuditService.rejectAudit(auditRequestId, notes);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) { next(error); }
  },

  async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await SellerAuditAnalyticsService.getPlatformAuditMetrics();
      res.status(200).json({ status: 'success', data: analytics });
    } catch (error) { next(error); }
  }
};
