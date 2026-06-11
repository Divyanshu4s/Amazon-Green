import Product from '../../../models/Product';
import SellerDocument from '../../../models/SellerDocument';

export class GreenwashingDetectionService {
  /**
   * Cross-references claims against known product/material data.
   */
  static async detectRisk(sellerId: string, claims: string[]) {
    // Basic heuristics for greenwashing detection
    let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    let flaggedIssues: string[] = [];

    const products = await Product.find({ seller: sellerId });
    const docs = await SellerDocument.find({ seller: sellerId, verificationStatus: 'verified' });

    // Claim: Carbon Neutral, but no certification
    const claimsCarbonNeutral = claims.some(c => c.toLowerCase().includes('carbon neutral'));
    const hasCarbonCert = docs.some(d => d.certificationName === 'carbon_neutral');
    
    if (claimsCarbonNeutral && !hasCarbonCert) {
      riskLevel = 'High';
      flaggedIssues.push('Claims carbon neutrality without verified certification.');
    }

    // Claim: Sustainable Packaging, but high plastic usage
    let highPlasticCount = 0;
    products.forEach(p => {
      // We added dimensions/materials to product earlier, checking simulated plastic %
      if (p.ecoScore < 40) highPlasticCount++; 
    });

    if (highPlasticCount > products.length * 0.5) {
      if (riskLevel === 'Low') riskLevel = 'Medium';
      if (riskLevel === 'High') riskLevel = 'Critical';
      flaggedIssues.push(`Over 50% of products have low eco scores despite high sustainability claims.`);
    }

    return { riskLevel, flaggedIssues };
  }
}
