import { GreenwashingDetectionService } from './greenwashing-detection.service';

export class SellerAuditMLService {
  /**
   * Simulates sending the seller's entire profile, product catalog, and delivery history
   * to the Python ML service.
   */
  static async runMLAudit(sellerId: string, claims: string[]) {
    // 1. Get greenwashing risk
    const { riskLevel, flaggedIssues } = await GreenwashingDetectionService.detectRisk(sellerId, claims);

    // 2. Mock ML output based on risk
    let confidence = 85; // Base confidence
    
    if (riskLevel === 'Critical') confidence = 10;
    else if (riskLevel === 'High') confidence = 35;
    else if (riskLevel === 'Medium') confidence = 65;

    // Simulate slight ML variance
    confidence = Math.max(0, Math.min(100, confidence + (Math.random() * 10 - 5)));

    let recommendation = 'Approve';
    if (confidence < 40) recommendation = 'Reject';
    else if (confidence < 70) recommendation = 'Manual Review Required';

    return {
      auditConfidence: Number(confidence.toFixed(2)),
      riskLevel,
      flaggedIssues,
      verificationRecommendation: recommendation
    };
  }
}
