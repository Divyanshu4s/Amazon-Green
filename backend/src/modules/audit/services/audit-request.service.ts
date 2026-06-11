import SellerAuditRequest, { AuditStatus } from '../../../models/SellerAuditRequest';

export class AuditRequestService {
  /**
   * Initializes a new audit request.
   */
  static async createRequest(sellerId: string, payload: { claims: string[], manufacturingInfo: string, materialInfo: string }) {
    // Check if one is already pending
    const existing = await SellerAuditRequest.findOne({
      seller: sellerId,
      status: { $in: [AuditStatus.SUBMITTED, AuditStatus.PROCESSING, AuditStatus.ML_REVIEW] }
    });

    if (existing) {
      throw new Error('An audit is already in progress for this seller.');
    }

    const request = await SellerAuditRequest.create({
      seller: sellerId,
      status: AuditStatus.SUBMITTED,
      ...payload
    });

    return request;
  }

  static async getStatus(sellerId: string) {
    const request = await SellerAuditRequest.findOne({ seller: sellerId }).sort({ createdAt: -1 });
    return request || { status: 'none' };
  }
}
