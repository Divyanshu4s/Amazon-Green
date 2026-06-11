import SellerAuditRequest from '../../../models/SellerAuditRequest';
import SellerDocument from '../../../models/SellerDocument';

export class SellerImprovementService {
  /**
   * Generates dynamic actionable insights based on the seller's latest audit.
   */
  static async generateInsights(sellerId: string) {
    const latestAudit = await SellerAuditRequest.findOne({ seller: sellerId }).sort({ createdAt: -1 });
    const docs = await SellerDocument.find({ seller: sellerId });
    
    const insights: string[] = [];

    if (!latestAudit) {
      insights.push("Submit your first Sustainability Audit to unlock your EcoBadge.");
      return insights;
    }

    if (latestAudit.mlRiskLevel === 'Medium' || latestAudit.mlRiskLevel === 'High') {
      insights.push("Ensure your product material claims match your packaging database to reduce greenwashing risk.");
    }

    if (docs.length === 0) {
      insights.push("Provide missing certifications (e.g., ISO 14001, FSC) to immediately boost your EcoScore by 15 points.");
    }

    // Mocking a packaging insight
    insights.push("Reduce plastic packaging by 30% across your catalog to qualify for the 'Packaging Champion' badge.");

    return insights;
  }
}
