import { EcoScoreService, EcoScoreResult } from './ecoscore.service';
import EcoScoreAudit from '../../../models/EcoScoreAudit';
import Product from '../../../models/Product';
import { AuditStatus } from '../enums/ecoscore.enum';
import { AppError } from '../../../utils/AppError';

export class GreenZoneAuditService {
  /**
   * Performs an audit on the product, calculates the score, 
   * saves it to the DB, and determines strengths/weaknesses.
   */
  static async performAudit(productId: string, dto: any) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Calculate score
    const result: EcoScoreResult = EcoScoreService.calculateScore(dto);

    // Determine strengths and weaknesses
    const strengths = [];
    const weaknesses = [];

    if (result.breakdown.material >= 80) strengths.push('Excellent sustainable material sourcing.');
    else if (result.breakdown.material < 40) weaknesses.push('High reliance on non-renewable or virgin materials.');

    if (result.breakdown.packaging >= 80) strengths.push('Eco-friendly packaging choice.');
    else if (result.breakdown.packaging < 40) weaknesses.push('Heavy plastic or unrecyclable packaging used.');

    // Determine audit status
    let auditStatus = AuditStatus.APPROVED;
    let auditNotes = 'Product passed the GreenZone Audit with satisfactory sustainability metrics.';

    if (result.ecoScore < 40 || weaknesses.length >= 2) {
      auditStatus = AuditStatus.REJECTED;
      auditNotes = 'Product failed the GreenZone Audit. Please review the sustainability weaknesses.';
    } else if (result.ecoScore < 60) {
      auditStatus = AuditStatus.NEEDS_REVIEW;
      auditNotes = 'Product flagged for manual review due to borderline sustainability metrics.';
    }

    // Save to EcoScoreAudit Collection
    const auditRecord = await EcoScoreAudit.create({
      product: productId,
      ruleScore: result.ecoScore, // The score computed right now
      mlScore: 0, // Placeholder for future ML integration
      finalScore: result.ecoScore,
      confidence: 0.95, // Rule-based is highly deterministic
      auditStatus,
      explanation: auditNotes,
    });

    // Update Product document with new score
    product.ecoScore = result.ecoScore;
    product.ecoGrade = result.ecoGrade as any;
    product.materialScore = result.breakdown.material;
    product.userImpactScore = result.breakdown.userImpact;
    product.durabilityScore = result.breakdown.durability;
    product.packagingScore = result.breakdown.packaging;
    product.localityScore = result.breakdown.locality;
    await product.save();

    return {
      auditId: auditRecord._id,
      ecoScore: result.ecoScore,
      ecoGrade: result.ecoGrade,
      auditStatus,
      auditNotes,
      sustainabilityStrengths: strengths,
      sustainabilityWeaknesses: weaknesses,
      explanations: result.explanations,
    };
  }
}
