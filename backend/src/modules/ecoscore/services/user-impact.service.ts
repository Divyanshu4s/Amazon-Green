import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';

export class UserImpactService {
  /**
   * Evaluates User Impact Score (25% weight)
   */
  static calculate(dto: CalculateEcoScoreDto): { score: number; explanations: string[] } {
    let score = 20; // Base baseline for average impact
    const explanations: string[] = [];

    if (dto.energySaving) {
      score += 20;
      explanations.push('Score increased because the product offers significant energy savings during use.');
    }

    if (dto.waterSaving) {
      score += 20;
      explanations.push('Score increased because the product offers water savings.');
    }

    if (dto.reusable) {
      score += 15;
      explanations.push('Score increased because the product is reusable, replacing disposable alternatives.');
    }

    if (dto.refillable) {
      score += 15;
      explanations.push('Score increased for refillable design, reducing long-term waste.');
    }

    if (dto.wasteReduction) {
      score += 10;
      explanations.push('Score increased because the product inherently reduces consumer waste.');
    }

    score = Math.max(0, Math.min(100, score));

    return { score, explanations };
  }
}
