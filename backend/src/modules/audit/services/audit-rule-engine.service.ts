import fs from 'fs';
import path from 'path';

export class AuditRuleEngine {
  private static rulesPath = path.join(__dirname, '../config/audit-rules.json');

  private static loadRules() {
    try {
      const data = fs.readFileSync(this.rulesPath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load audit rules", e);
      return {};
    }
  }

  /**
   * Applies static heuristics to generate a rule-based score.
   */
  static calculateScore(sellerData: any, docs: any[], products: any[]) {
    const rules = this.loadRules();
    let score = 50; // Base score

    // 1. Certifications
    if (docs.some(d => d.verificationStatus === 'verified')) {
      score += rules.verified_certification || 0;
    } else {
      score += rules.missing_certifications || 0;
    }

    if (sellerData.carbonNeutralShipping) {
      score += rules.carbon_neutral_shipping || 0;
    }

    // 2. Products
    const sustainableCount = products.filter(p => p.ecoScore >= 70).length;
    const ratio = products.length > 0 ? (sustainableCount / products.length) : 0;
    
    if (ratio > 0.8) score += rules.sustainable_products_high || 0;

    // 3. Customer Rating (Mocked field check)
    if (sellerData.customerEcoRating && sellerData.customerEcoRating < 3) {
      score += rules.poor_customer_eco_rating || 0;
    }

    // Clamp score 0-100
    return Math.max(0, Math.min(100, score));
  }
}
