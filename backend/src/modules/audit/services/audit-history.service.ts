import SellerAuditRequest from '../../../models/SellerAuditRequest';

export class AuditHistoryService {
  /**
   * Retrieves the historical log of audits for a specific seller.
   */
  static async getHistory(sellerId: string) {
    const audits = await SellerAuditRequest.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .select('status finalAuditScore recommendedBadge createdAt');

    return audits;
  }
}
