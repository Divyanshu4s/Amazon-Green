import SellerAuditRequest from '../../../models/SellerAuditRequest';
import { HybridAuditService } from './hybrid-audit.service';

export class AuditWorkflowService {
  /**
   * Triggers the asynchronous execution of an audit.
   */
  static async triggerAudit(auditRequestId: string) {
    // In a real app, this might publish to a queue (e.g. RabbitMQ)
    // Here we just execute it directly
    return await HybridAuditService.executeAudit(auditRequestId);
  }
}
