import Seller, { VerificationStatus } from '../../../models/Seller';
import SellerAuditRequest from '../../../models/SellerAuditRequest';

export class SellerAuditAnalyticsService {
  /**
   * High-level analytics for the platform admin regarding Audits and Greenwashing.
   */
  static async getPlatformAuditMetrics() {
    const totalSellers = await Seller.countDocuments();
    const verifiedSellers = await Seller.countDocuments({ verificationStatus: { $ne: VerificationStatus.UNVERIFIED } });
    
    // Calculate average EcoScore
    const ecoScoreAgg = await Seller.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$sustainabilityScore' } } }
    ]);
    const avgScore = ecoScoreAgg[0]?.avgScore || 0;

    // Greenwashing Attempts
    const greenwashingAttempts = await SellerAuditRequest.countDocuments({
      mlRiskLevel: { $in: ['High', 'Critical'] }
    });

    const totalAudits = await SellerAuditRequest.countDocuments();
    const successfulAudits = await SellerAuditRequest.countDocuments({ status: 'resolved' });
    const successRate = totalAudits > 0 ? (successfulAudits / totalAudits) * 100 : 0;

    return {
      totalSellers,
      verifiedSellers,
      averageSellerEcoScore: Number(avgScore.toFixed(2)),
      totalAuditsRun: totalAudits,
      auditSuccessRate: Number(successRate.toFixed(2)),
      greenwashingAttemptsDetected: greenwashingAttempts
    };
  }
}
