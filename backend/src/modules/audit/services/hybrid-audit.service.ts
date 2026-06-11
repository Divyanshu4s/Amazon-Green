import SellerAuditRequest, { AuditStatus } from '../../../models/SellerAuditRequest';
import Seller, { VerificationStatus } from '../../../models/Seller';
import Product from '../../../models/Product';
import SellerDocument from '../../../models/SellerDocument';
import { AuditRuleEngine } from './audit-rule-engine.service';
import { SellerAuditMLService } from './seller-audit-ml.service';
import { SellerBadgeService } from './seller-badge.service';

export class HybridAuditService {
  /**
   * Merges Rule Engine and ML Output.
   * 70% Rule-Based, 30% ML.
   */
  static async executeAudit(auditRequestId: string) {
    const request = await SellerAuditRequest.findById(auditRequestId);
    if (!request) throw new Error('Audit Request not found');

    request.status = AuditStatus.PROCESSING;
    await request.save();

    const seller = await Seller.findById(request.seller);
    const products = await Product.find({ seller: request.seller });
    const docs = await SellerDocument.find({ seller: request.seller });

    // 1. Run Rule Engine (70%)
    const ruleScore = AuditRuleEngine.calculateScore(seller, docs, products);
    
    // 2. Run ML Service (30%)
    request.status = AuditStatus.ML_REVIEW;
    await request.save();

    const mlResult = await SellerAuditMLService.runMLAudit(request.seller.toString(), request.claims);

    // 3. Merge
    // Treat ML Confidence as a score 0-100
    const finalScore = (ruleScore * 0.7) + (mlResult.auditConfidence * 0.3);

    // 4. Update request
    request.ruleBasedScore = ruleScore;
    request.mlConfidenceScore = mlResult.auditConfidence;
    request.mlRiskLevel = mlResult.riskLevel as any;
    request.finalAuditScore = Number(finalScore.toFixed(2));
    request.recommendedBadge = SellerBadgeService.determineBadge(finalScore);

    // Auto-resolve or push to manual admin review based on ML recommendation
    if (mlResult.verificationRecommendation === 'Manual Review Required') {
      request.status = AuditStatus.ADMIN_REVIEW;
    } else if (mlResult.verificationRecommendation === 'Reject') {
      request.status = AuditStatus.REJECTED;
      if (seller) {
        seller.verificationStatus = VerificationStatus.UNVERIFIED;
        await seller.save();
      }
    } else {
      request.status = AuditStatus.RESOLVED;
      // Assign Badge and Verification
      if (seller) {
        seller.verificationStatus = VerificationStatus.VERIFIED_GREEN;
        await seller.save();
        await SellerBadgeService.awardBadge(seller._id.toString(), finalScore);
      }
    }

    await request.save();
    return request;
  }
}
