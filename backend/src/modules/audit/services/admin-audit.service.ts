import SellerAuditRequest, { AuditStatus } from '../../../models/SellerAuditRequest';
import Seller, { VerificationStatus } from '../../../models/Seller';
import { SellerBadgeService } from './seller-badge.service';

export class AdminAuditService {
  /**
   * Admin manually overrides and approves an audit.
   */
  static async approveAudit(auditRequestId: string, notes: string) {
    const request = await SellerAuditRequest.findById(auditRequestId);
    if (!request) throw new Error('Audit Request not found');

    request.status = AuditStatus.RESOLVED;
    request.adminFeedback = notes;
    await request.save();

    // Force approve
    const seller = await Seller.findById(request.seller);
    if (seller) {
      seller.verificationStatus = VerificationStatus.VERIFIED_GREEN;
      await seller.save();
      await SellerBadgeService.awardBadge(seller._id.toString(), request.finalAuditScore || 50);
    }

    return request;
  }

  /**
   * Admin manually rejects an audit.
   */
  static async rejectAudit(auditRequestId: string, notes: string) {
    const request = await SellerAuditRequest.findById(auditRequestId);
    if (!request) throw new Error('Audit Request not found');

    request.status = AuditStatus.REJECTED;
    request.adminFeedback = notes;
    await request.save();

    const seller = await Seller.findById(request.seller);
    if (seller) {
      seller.verificationStatus = VerificationStatus.UNVERIFIED;
      // Strip badge
      seller.ecoBadge = 'none' as any;
      await seller.save();
    }

    return request;
  }
}
